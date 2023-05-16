import './sass/index.scss';
import Notiflix from "notiflix"
import { fetchImages } from "./js/fetchImages"
import { renderGallery } from "./js/gallery";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.querySelector('.search-form')
const gallery = document.querySelector('.gallery')
const moreLoad = document.querySelector('.load-more')
let page = 1
let query = ''
let simpleLightbox
const perPage = 40;
form.addEventListener('submit',handleSearch)
// moreLoad.addEventListener('click',loadButton)

function handleSearch (e) {
  
    e.preventDefault() 
    page = 1;
    query = e.currentTarget.searchQuery.value.trim();
    gallery.innerHTML='';
// moreLoad.classList.add('is-hidden');

if(query === ''){
    Notiflix.Notify.failure('The search string cannot be empty. Please specify your search query.');
    return
}

fetchImages(query,page,perPage)
    .then(({data}) => {
        if(data.totalHits === 0){
            Notiflix.Notify.failure(
                'Sorry, there are no images matching your search query. Please try again.',
              );
        }
else{
    renderGallery(data.hits);
    simpleLightbox = new SimpleLightbox('.gallery a').refresh();
    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
 console.log(data)

// if(data.totalHits > perPage){
//     moreLoad.classList.remove('is-hidden')

// }


if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    loadButton();
   
  }


form.reset();
}
    })
.catch(error => console.log(error))


}

function loadButton () {
page +=1;

simpleLightbox.destroy();
fetchImages(query,page,perPage).then(({data}) => {
    renderGallery(data.hits)
    simpleLightbox = new SimpleLightbox('.gallery a').refresh();
    const allPages = Math.ceil(data.totalHits / perPage);

    if(page > allPages){
        moreLoad.classList.add('is-hidden')
        Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
    }
} )
.catch(error => console.log(error));

}


window.addEventListener("scroll", function() {
    // Jeśli użytkownik jest blisko końca strony, załaduj więcej obrazków
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      loadButton();
    }

   
  });


