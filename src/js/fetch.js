import axios from 'axios';

export default async function fetchImages(searchQuery, page, per_page) {
  try {
    const result = await axios(
      'https://pixabay.com/api/?key=31465817-bc380622abb9203b3eae708dc&' +
        `q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&` +
        `page=${page}&per_page=${per_page}`
    );

    return result.data;
  } catch (error) {
    console.log(error);
  }
}
