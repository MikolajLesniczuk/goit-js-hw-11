import axios from "axios";

axios.defaults.baseURL = 'https://pixabay.com/api/';
const myKey = '36411349-fd3335cbc8c141eadb26de171'

async function fetchImages(query, page, perPage) {

    const response = await axios.get(
      `?key=${myKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`,
    );


    return response;
  
 }



export {fetchImages}