
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchInPixabayApi } from "./js/api";


const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
let params
export let perPage = 40;
export let page = 1;





form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);


async function onSearch(e) {
    e.preventDefault();
    const input = e.currentTarget.elements.searchQuery;
    params = input.value.trim()
    const searchQuery = input.value;
    try {
      clear();
      const response = await fetchInPixabayApi(searchQuery);
      console.log(response);
       
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
        
      createMarkup(response);
      showBtn();
      
    } catch (error) {
      console.error('Error:', error);
    }

};


async function onLoadMoreBtnClick() {
  
    try {
      page += 1;
     
      const response = await fetchInPixabayApi(params);
      const totalPages = page * perPage;
     
        if (response.totalHits <= totalPages) {
         hideBtn();
         return   Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        };
        
      createMarkup(response);
      showBtn();
      
    } catch (error) {
      console.error('Error:', error);
    }

  
 

}
        
function createMarkup({hits}) {
  const markup = hits.map(
    ({ webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) => `
<div class="photo-card"><a href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
  </a>
</div>`);
  
  gallery.insertAdjacentHTML('beforeend', markup.join(''));
  simpleLightBox.refresh();
}

const simpleLightBox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function clear() {
  gallery.innerHTML = '';
};


function hideBtn() {
  loadMoreBtn.classList.add('hideBtn');
};


function showBtn() {
  loadMoreBtn.classList.remove('hideBtn');
};



