import movieCardMyLibrary from 'bundle-text:../../templates/movieCardMyLibrary.hbs';
import { state } from '../state';
import Notiflix from 'notiflix';
import { getRefs, renderTemplate, getStateMovies } from '../utils';

export function getLibraryCollection(type) {
  const refs = getRefs();
  refs.gallery.innerHTML = '';
  try {
    if (state.libraryMovies.length === 0) {
      Notiflix.Notify.info('Your collection is empty.');
    }

    renderTemplate(
      movieCardMyLibrary,
      { movies: getStateMovies(type) },
      refs.gallery
    );
  } catch (error) {
    Notiflix.Notify.failure(`Error: ${error.message}`);
  }
}
