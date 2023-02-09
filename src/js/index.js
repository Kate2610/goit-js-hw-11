import '../css/styles.css';
import fetchImages from './fetch';
import renderMarkup from './markup';
import loadMoreHandler from './load-more';
import infiniteScroll from './infinite';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
Notify.init({
  width: '360px',
  position: 'right-top',
  fontSize: '18px',
});

const searchForm = document.querySelector('#search-form');
const searchBox = document.querySelector('#search-box');
const infiniteCheck = document.querySelector('#infinite');
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');

const per_page = 40;

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
  scrollZoom: false,
});

searchForm.addEventListener('submit', async e => {
  e.preventDefault();

  let page = 1;

  if (!searchBox.value) {
    return;
  }

  loadMore.style.display = 'none';
  gallery.innerHTML = '';

  const fetchedImages = await fetchImages(searchBox.value, page, per_page);

  if (fetchedImages.total === 0) {
    Notify.info(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }

  Notify.info(`Hooray! We found ${fetchedImages.totalHits} images.`);
  gallery.insertAdjacentHTML('beforeend', renderMarkup(fetchedImages.hits));

  lightbox.refresh();

  if (per_page * page >= fetchedImages.totalHits) {
    return;
  }

  if (infiniteCheck.checked) {
    infiniteScroll(searchBox.value, page, per_page);
  } else {
    loadMoreHandler(searchBox.value, page, per_page);
  }
});
