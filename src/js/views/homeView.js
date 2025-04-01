import { state } from '../state';
import { renderMovieCards, renderPagination } from '../components';
import { getRefs } from '../utils';
import { updateHeaderUI } from '../components';

const refs = getRefs();

export function homeView() {
  if (!state.movies.length) {
    container.innerHTML = '<p>No movies found.</p>';
    return;
  }
  refs.homeContainer.classList.replace('library-container', 'home-container');
  refs.homeBgcContainer.classList.replace(
    'library-bgc-container',
    'home-bgc-container'
  );
  refs.itemLibrary.classList.remove('current');
  refs.itemHome.classList.add('current');
  renderMovieCards(state.movies, refs.gallery);
  renderPagination();
  renderSearchInput();
}

function renderSearchInput() {
  const btnContainer = document.querySelector('[data-btn="container"]');
  if (btnContainer) btnContainer.replaceWith(refs.searchForm);
}
