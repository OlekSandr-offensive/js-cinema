export default function getRefs() {
  return {
    // theme switcher
    body: document.querySelector('body'),
    checkbox: document.querySelector('#theme-switch-toggle'),
    // path template filmListCard
    filmGallery: document.querySelector('.gallery'),
    gallery: document.querySelector('#gallery'),
    //path template pagination
    pagination: document.querySelector('#appendBtn'),
    //path template searchForm
    searchForm: document.querySelector('#search-form'),
    searchInput: document.querySelector('#search-input'),
  };
}
