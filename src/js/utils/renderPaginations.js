export function renderPagination(state) {
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
