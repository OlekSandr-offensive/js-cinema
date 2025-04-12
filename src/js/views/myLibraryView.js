import libraryBtnTpl from 'bundle-text:../../templates/libraryBtnTpl.hbs';
import { renderTemplate, getRefs } from '../utils';
import { toggleLibraryButtons } from '../components';

const {
  gallery,
  pagination,
  homeContainer,
  homeBgcContainer,
  itemHome,
  itemLibrary,
  searchForm,
  UiLibraryBtn,
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
}

function renderButtons() {
  const makeBtn = document.createElement('div');
  makeBtn.classList.add('btn-container');
  makeBtn.setAttribute('data-btn', 'container');
  renderTemplate(libraryBtnTpl, {}, makeBtn);
  searchForm.replaceWith(makeBtn);
}

UiLibraryBtn.addEventListener('click', e => toggleLibraryButtons(e));
