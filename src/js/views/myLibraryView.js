import libraryBtnTpl from 'bundle-text:../../templates/libraryBtnTpl.hbs';
import { renderTemplate, getRefs } from '../utils';
import { deleteMovieById } from '../components';

const {
  gallery,
  pagination,
  homeContainer,
  homeBgcContainer,
  itemHome,
  itemLibrary,
  searchForm,
} = getRefs();

export function myLibraryView() {
  gallery.innerHTML = '';
  pagination.innerHTML = '';
  homeContainer.classList.replace('home-container', 'library-container');
  homeBgcContainer.classList.replace(
    'home-bgc-container',
    'library-bgc-container'
  );
  itemHome.classList.remove('current');
  itemLibrary.classList.add('current');
  renderButtons();

  gallery.addEventListener('click', deleteMovieById);
}

function renderButtons() {
  const makeBtn = document.createElement('div');
  makeBtn.classList.add('btn-container');
  makeBtn.setAttribute('data-btn', 'container');
  renderTemplate(libraryBtnTpl, {}, makeBtn);
  searchForm.replaceWith(makeBtn);
}
