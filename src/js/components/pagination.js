import paginationPage from 'bundle-text:../../templates/paginationPage.hbs';
import {
  getPaginationContext,
  renderTemplate,
  getRefs,
  fetchMovies,
} from '../utils';
import { state } from '../state';
import { homeView } from '../views/homeView';

const refs = getRefs();

export function renderPagination() {
  const mobile = window.matchMedia(
    'only screen and (max-width: 768px)'
  ).matches;
  const context = getPaginationContext(
    state.currentPage,
    state.totalPages,
    mobile
  );
  renderTemplate(paginationPage, context, refs.pagination);
}

async function onPageChange(e) {
  refs.pagination.innerHTML = '';
  const pageBtn = e.target.closest('[data-page]');
  if (!pageBtn) return;

  const newPage = Number(pageBtn.dataset.page);
  if (newPage === state.currentPage) return;

  state.currentPage = newPage;
  state.isLoading = true;

  try {
    refs.gallery.innerHTML = '';
    await fetchMovies(state.currentQuery, state.currentPage);

    homeView();
  } catch (error) {
    console.error('Pagination Error:', error);
  } finally {
    state.isLoading = false;
  }
}

refs.pagination.addEventListener('click', onPageChange);

function updatePaginationOnResize() {
  refs.pagination.innerHTML = '';
  renderPagination();
}

const debouncedResizeHandler = _.debounce(updatePaginationOnResize, 250);

window.addEventListener('resize', debouncedResizeHandler);
