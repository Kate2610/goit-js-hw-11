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
import throttle from 'lodash.throttle';

const gallery = document.querySelector('.gallery');

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
  scrollZoom: false,
});

export default function infiniteScroll(searchQuery, page, per_page) {
  let triggered = false;

  window.addEventListener(
    'scroll',
    throttle(async () => {
      const height = document.body.offsetHeight;
      const screenHeight = window.innerHeight;
      const scrolled = window.scrollY;
      const threshold = height - screenHeight / 4;
      const position = scrolled + screenHeight;

      if (position < threshold || triggered) {
        return;
      }

      triggered = true;
      page += 1;

      const fetchedImages = await fetchImages(searchQuery, page, per_page);

      gallery.insertAdjacentHTML('beforeend', renderMarkup(fetchedImages.hits));

      lightbox.refresh();

      if (per_page * page >= fetchedImages.totalHits) {
        Notify.info(
          "We're sorry, but you've reached the end of search results."
        );

        triggered = true;
        return;
      }

      triggered = false;
    }, 300)
  );
}
