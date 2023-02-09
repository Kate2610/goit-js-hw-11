import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import infiniteScroll from 'infinite-scroll';
import searchImages from './fetchImages';

const form = document.querySelector('.search-form');
const imagesList = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');

form.addEventListener('submit', onSubmit);
loadBtn.addEventListener('click', onLoadBtnClick);

function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    searchImages.galleryItems.inputValue = form.elements.searchQuery.value.trim();
    loadBtn.classList.remove('hidden');

    if (searchImages.galleryItems.inputValue === ""){
        imagesList.innerHTML = "";
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        loadBtn.classList.add('hidden');
        return;
    }

    searchImages.fetchImages(searchImages.galleryItems.inputValue).then(items=>{
      if (items.length === 0){
        imagesList.innerHTML = "";
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        loadBtn.classList.add('hidden');
        return;
      }
        console.log(items);
    })

    cleanerMarkup(imagesList);
    searchImages.galleryItems.imagePage = 1;
    onLoadBtnClick()
  };

function onLoadBtnClick(){
  loadBtn.disabled=true;
  loadBtn.textContent='Loading...';
  searchImages.fetchImages(searchImages.galleryItems.inputValue).then(items=>{
    searchImages.galleryItems.imagePage += 1;
    console.log(items);
    createImageCard(items);
    gallery.refresh();
    loadBtn.disabled=false;
    loadBtn.textContent='Load more';
  }).catch(error=>{
    Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
    loadBtn.classList.add('hidden');
  })
}

function createImageCard(hits) {
   const markup = hits.map(hit => `<div class="photo-card">
   <a href="${hit.largeImageURL}"><img src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" width="400px" height="244px" style="object-fit:cover;"/></a>
   <div class="info">
     <p class="info-item">
       <b>Likes <br>${hit.likes}</b>
     </p>
     <p class="info-item">
       <b>Views <br>${hit.views}</b>
     </p>
     <p class="info-item">
       <b>Comments <br>${hit.comments}</b>
     </p>
     <p class="info-item">
       <b>Downloads <br>${hit.downloads}</b>
     </p>
   </div>
 </div>`).join('');

imagesList.insertAdjacentHTML("beforeend", markup);
}

const gallery = new SimpleLightbox('.gallery a', {
  captions: true,
  captionDelay: 250,
});

function cleanerMarkup(element) {
  return  element.innerHTML = '';
}