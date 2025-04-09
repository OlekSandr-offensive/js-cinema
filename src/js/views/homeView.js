import { state } from '../state';
import { renderMovieCards } from '../components';
import { getRefs, renderPagination } from '../utils';

const {
  gallery,
  homeContainer,
  homeBgcContainer,
  itemHome,
  itemLibrary,
  searchForm,
} = getRefs();

export function homeView() {
  if (!state.movies.length) {
    container.innerHTML = '<p>No movies found.</p>';
    return;
  }
  homeContainer.classList.replace('library-container', 'home-container');
  homeBgcContainer.classList.replace(
    'library-bgc-container',
    'home-bgc-container'
  );
  itemLibrary.classList.remove('current');
  itemHome.classList.add('current');
  renderMovieCards(state.movies, gallery);
  renderPagination();
  renderSearchInput();
}

function renderSearchInput() {
  const btnContainer = document.querySelector('[data-btn="container"]');
  if (btnContainer) btnContainer.replaceWith(searchForm);
}
