import axios from 'axios';

const galleryItems = {
    imagePage: 1,
    inputValue: ''
}

const API = 'https://pixabay.com/api/';
const KEY = '33379348-ee229b2ba87d6e51820269182';

async function fetchImages(){
    const response = await axios.get(`${API}?key=${KEY}&q=${galleryItems.inputValue}&image_type=photo$orientation=horizontal&safesearch=true&per_page=40&page=${galleryItems.imagePage}`);
    return response.data.hits;
}

export default {galleryItems, fetchImages};