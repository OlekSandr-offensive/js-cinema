import {
  renderPagination,
  getRefs,
  initMoviesState,
  renderPaginationLibrary,
  getPathname,
} from '../utils';
import { state } from '../state';
import { renderMovieCards } from './movieCard';
import { onScrollGalleryTop } from './backToTop';
import { getLibraryCollection } from './libraryCollections';
import { showSpinner } from './spinner';

const { gallery, pagination } = getRefs();

async function onPageChange(e) {
  e.preventDefault();
  const pageBtn = e.target.closest('[data-page]');
  if (!pageBtn) return;

  const newPage = Number(pageBtn.dataset.page);
  const type = getPathname();
  const currentPage = state.currentPage[type];

  if (newPage === currentPage) return;

  state.currentPage[type] = newPage;
  state.isLoading = true;
  showSpinner(true);

  try {
    gallery.innerHTML = '';
    pagination.innerHTML = '';
    if (type === 'home') {
      await initMoviesState(state.currentQuery, state.currentPage[type]);

      renderMovieCards(state.movies, gallery);
      renderPagination();
    } else {
      getLibraryCollection(type);
      renderPaginationLibrary(type);
    }
    onScrollGalleryTop();
  } catch (error) {
    console.error('Pagination Error:', error);
  } finally {
    state.isLoading = false;
    showSpinner();
  }
}

pagination.addEventListener('click', onPageChange);

function updatePaginationOnResize() {
  renderPagination();
}

const debouncedResizeHandler = _.debounce(updatePaginationOnResize, 250);

window.addEventListener('resize', debouncedResizeHandler);
