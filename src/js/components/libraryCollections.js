import movieCardMyLibrary from 'bundle-text:../../templates/movieCardMyLibrary.hbs';
import { state } from '../state';
import Notiflix from 'notiflix';
import {
  getRefs,
  renderTemplate,
  renderPaginationLibrary,
  paginate,
} from '../utils';

export function getLibraryCollection(type) {
  const { gallery, pagination } = getRefs();
  const itemsPerPage = 20;

  try {
    gallery.innerHTML = '';
    pagination.innerHTML = '';

    if (state.libraryMovies[type].length === 0) {
      Notiflix.Notify.info('Your collection is empty.');
      return;
    }

    const paginatedMovies = paginate(
      state.libraryMovies[type],
      state.currentPage[type],
      itemsPerPage
    );

    renderTemplate(movieCardMyLibrary, { movies: paginatedMovies }, gallery);

    if (state.libraryMovies[type].length < itemsPerPage) return;

    renderPaginationLibrary(type);
  } catch (error) {
    console.error(error);
    Notiflix.Notify.failure(`Error: ${error.message}`);
  }
}
