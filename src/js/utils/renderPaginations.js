import paginationPage from 'bundle-text:../../templates/paginationPage.hbs';
import { getPaginationContext } from './getPaginationContext';
import { renderTemplate } from './renderTemplate';
import { state } from '../state';
import { getRefs } from './getRefs';

const { pagination } = getRefs();

export function renderPagination() {
  const context = getPaginationContext(
    state.currentPage.home,
    state.totalPages,
    state.isMobile
  );
  renderTemplate(paginationPage, context, pagination);
}

export function renderPaginationLibrary(type) {
  const itemsPerPage = 20;
  const movies = state.libraryMovies[type] || [];
  const totalPages = Math.ceil(movies.length / itemsPerPage);

  const context = getPaginationContext(
    state.currentPage[type],
    totalPages,
    state.isMobile
  );
  renderTemplate(paginationPage, context, pagination);
}
