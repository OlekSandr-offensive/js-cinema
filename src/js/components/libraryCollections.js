import movieCardMyLibrary from 'bundle-text:../../templates/movieCardMyLibrary.hbs';
import { getLibraryMovies } from '../services';
import { state } from '../state';
import { showSpinner } from './spinner';
import Notiflix from 'notiflix';
import { getRefs, renderTemplate } from '../utils';

export function setupListenersLibraryColl() {
  const refs = getRefs();
  refs.libraryWatched.addEventListener('click', getWatchedCollection);
  refs.libraryQueue.addEventListener('click', getQueueCollection);
}

async function getWatchedCollection() {
  getLibraryCollection('watched');
}

async function getQueueCollection() {
  getLibraryCollection('queue');
}

async function getLibraryCollection(type) {
  const refs = getRefs();
  refs.gallery.innerHTML = '';
  state.isLoading = true;
  showSpinner();

  try {
    const moviesToRender = await getLibraryMovies(type);
    state.libraryMovies = moviesToRender;

    if (state.libraryMovies.length === 0) {
      Notiflix.Notify.info('Your collection is empty.');
    }

    renderTemplate(
      movieCardMyLibrary,
      { movies: state.libraryMovies },
      refs.gallery
    );
  } catch (error) {
    Notiflix.Notify.failure(`Error: ${error.message}`);
  } finally {
    state.isLoading = false;
    showSpinner();
  }
}
