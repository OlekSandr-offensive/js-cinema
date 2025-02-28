import paginationPage from 'bundle-text:../../templates/paginationPage.hbs';
import Handlebars from 'handlebars';
import getRefs from '../utils/getRefs';

const refs = getRefs();

const paginationPageTemplate = Handlebars.compile(paginationPage);
function getPaginationContext(currentPage, totalPages, isMobile = false) {
  const delta = 2;
  const pages = [];
  const API_PAGE_LIMIT = 500;

  const maxPage = Math.min(totalPages, API_PAGE_LIMIT);
  if (currentPage < 1) {
    currentPage = 1;
  } else if (currentPage > maxPage) {
    currentPage = maxPage;
  }

  const left = Math.max(2, currentPage - delta);
  const right = Math.min(maxPage - 1, currentPage + delta);

  if (isMobile) {
    let left = currentPage - delta;
    let right = currentPage + delta;

    if (left < 1) {
      left = 1;
      right = Math.min(maxPage, left + 4);
    }
    if (right > maxPage) {
      right = maxPage;
      left = Math.max(1, right - 4);
    }
    for (let i = left; i <= right; i++) {
      pages.push({ number: i, isActive: i === currentPage });
    }
  } else {
    pages.push({ number: 1, isActive: currentPage === 1 });

    if (left > 2) {
      pages.push({ isDots: true });
    }

    for (let i = left; i <= right; i++) {
      pages.push({ number: i, isActive: i === currentPage });
    }

    if (right < maxPage - 1) {
      pages.push({ isDots: true });
    }

    if (maxPage > 1) {
      pages.push({
        number: maxPage,
        isActive: currentPage === maxPage,
      });
    }
  }

  return {
    pages,
    showPrev: currentPage > 1,
    prevPage: currentPage - 1,
    showNext: currentPage < maxPage,
    nextPage: currentPage + 1,
  };
}

function isMobileView() {
  return window.matchMedia('only screen and (max-width: 768px)').matches;
}

export function renderPagination(currentPage, totalPages) {
  const mobile = isMobileView();
  const context = getPaginationContext(currentPage, totalPages, mobile);
  refs.pagination.insertAdjacentHTML(
    'beforeend',
    paginationPageTemplate(context)
  );
}
