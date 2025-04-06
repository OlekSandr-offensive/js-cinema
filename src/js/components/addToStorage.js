import { addMovieToLibrary } from '../services/libraryService.js';
import { state } from '../state/state.js';
import Notiflix from 'notiflix';
import {
  getRefs,
  updateStorageButton,
  getStateMovies,
  getStateMoviesId,
  saveToLocal,
} from '../utils';
import { Modal } from '../plugins';
import { deleteMovieByIdOnModal } from './deleteMovieById';

const modal = new Modal({
  rootSelector: '[data-modal]',
  activeClass: 'backdrop-hidden',
  bodyClass: 'no-scroll',
  onClose: () => {
    document.body.classList.remove('no-scroll');
  },
});

export function setupListenersModalBtn(movieId) {
  const refs = getRefs();
  if (!refs.btnWatched || !refs.btnQueue) return;
  refs.btnWatched.addEventListener('click', () =>
    addToWatchedCollection(movieId)
  );
  refs.btnQueue.addEventListener('click', () => addToQueueCollection(movieId));
}

async function addToWatchedCollection(movieId) {
  const refs = getRefs();
  if (window.location.pathname.includes('/home')) {
    await addToStorage(movieId, 'watched');
  } else {
    modal.close();
    await deleteMovieByIdOnModal(movieId, refs.listenerCard);
  }
}

async function addToQueueCollection(movieId) {
  const refs = getRefs();
  if (window.location.pathname.includes('/home')) {
    await addToStorage(movieId, 'queue');
  } else {
    modal.close();
    await deleteMovieByIdOnModal(movieId, refs.listenerCard);
  }
}

async function addToStorage(movieId, type) {
  try {
    const movieItem = state.movies.find(movie => movie.id === movieId);
    if (!movieItem) {
      Notiflix.Notify.failure('Movie not found in state!');
      return;
    }

    getStateMovies(type).push(movieItem);
    getStateMoviesId(type).add(movieId);

    saveToLocal({ ...state.libraryMovies }, 'library');

    await addMovieToLibrary({ ...movieItem }, type);

    Notiflix.Notify.success(`Movie added to ${type} list!`);
    updateStorageButton(movieId, type);
  } catch (error) {
    Notiflix.Notify.failure(`Error: ${error.message}`);
  }
}
