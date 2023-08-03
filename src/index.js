
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchInPixabayApi } from "./js/api";
import { clear, hideBtn, showBtn } from "./js/helpers";

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');



form.addEventListener('submit', onSearch);
// loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);


async function onSearch(e) {
    e.preventDefault();
    const input = e.currentTarget.elements.searchQuery;
    const searchQuery = input.value;
    try {
      clear();
      const response = await fetchInPixabayApi(searchQuery);
       
        if (!input.value.trim()) {
         hideBtn();
          return  Notiflix.Notify.failure(
                'Sorry, there are no images matching your search query. Please try again.');
        
        };
     
  
        if (response.hits.length < 1) {
         hideBtn();
         return   Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        };
         console.log(response);
     
         showBtn();
      
    } catch (error) {
      console.error('Error:', error);
    }

}
        




function clear() {
  gallery.innerHTML = '';
};


function hideBtn() {
  loadMoreBtn.classList.add('hideBtn');
};


function showBtn() {
  loadMoreBtn.classList.remove('hideBtn');
};



