import paginationPage from 'bundle-text:../../templates/paginationPage.hbs';
import { getPaginationContext } from './getPaginationContext';
import { renderTemplate } from './renderTemplate';
import { state } from '../state';
import { getRefs } from './getRefs';

const { pagination } = getRefs();

export function renderPagination() {
  const mobile = window.matchMedia(
    'only screen and (max-width: 768px)'
  ).matches;
  const context = getPaginationContext(
    state.currentPage.home,
    state.totalPages,
    mobile
  );
  renderTemplate(paginationPage, context, pagination);
}

export function renderPaginationLibrary(type) {
  const mobile = window.matchMedia(
    'only screen and (max-width: 768px)'
  ).matches;
  const itemsPerPage = 20;
  const totalPages = Math.ceil(state.libraryMovies[type].length / itemsPerPage);

  const context = getPaginationContext(
    state.currentPage[type],
    totalPages,
    mobile
  );
  renderTemplate(paginationPage, context, pagination);
}
