import libraryBtnTpl from 'bundle-text:../../templates/libraryBtnTpl.hbs';
import { renderTemplate, getRefs } from '../utils';
import { setupListenersLibraryColl } from '../components';

const refs = getRefs();

export function myLibraryView() {
  refs.gallery.innerHTML = '';
  refs.pagination.innerHTML = '';
  refs.homeContainer.classList.replace('home-container', 'library-container');
  refs.homeBgcContainer.classList.replace(
    'home-bgc-container',
    'library-bgc-container'
  );
  refs.itemHome.classList.remove('current');
  refs.itemLibrary.classList.add('current');
  renderButtons();
  setupListenersLibraryColl();
}

function renderButtons() {
  const makeBtn = document.createElement('div');
  makeBtn.classList.add('btn-container');
  makeBtn.setAttribute('data-btn', 'container');
  renderTemplate(libraryBtnTpl, {}, makeBtn);
  refs.searchForm.replaceWith(makeBtn);
}
