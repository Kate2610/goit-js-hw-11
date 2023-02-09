import fetchImages from './fetch';
import renderMarkup from './markup';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
Notify.init({
  width: '360px',
  position: 'right-top',
  fontSize: '18px',
});

const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
  scrollZoom: false,
});

export default async function loadMoreHandler(searchQuery, page, per_page) {
  loadMore.style.display = 'block';

  loadMore.addEventListener('click', async e => {
    e.target.style.display = 'none';
    page += 1;

    const fetchedImages = await fetchImages(searchQuery, page, per_page);

    gallery.insertAdjacentHTML('beforeend', renderMarkup(fetchedImages.hits));

    const { height: cardHeight } =
      gallery.firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2 - 170,
      behavior: 'smooth',
    });

    lightbox.refresh();

    e.target.style.display = 'block';

    if (per_page * page >= fetchedImages.totalHits) {
      loadMore.style.display = 'none';
      Notify.info("We're sorry, but you've reached the end of search results.");
    }
  });
}
