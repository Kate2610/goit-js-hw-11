export default function renderMarkup(data) {
  const markup = data
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
        <a href="${largeImageURL}" class="card pagination__next">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" />
          <div class="card__info">
            <div class="card__item">
              <b>Likes</b>
              <p>${likes}</p>
            </div>
            <div class="card__item">
              <b>Views</b>
              <p>${views}</p>
            </div>
            <div class="card__item">
              <b>Comments</b>
              <p>${comments}</p>
            </div>
            <div class="card__item">
              <b>Downloads</b>
              <p>${downloads}</p>
            </div>
          </div>
        </a>`;
      }
    )
    .join('');

  return markup;
}
