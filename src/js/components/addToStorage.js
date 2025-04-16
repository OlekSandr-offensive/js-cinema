import { addMovieToLibrary } from '../services/libraryService.js';
import { state } from '../state/state.js';
import Notiflix from 'notiflix';
import { getRefs } from '../utils';
import { Modal } from '../plugins';
import { deleteMovie } from './deleteMovieById';
import { updateModalUI } from './updateUI.js';

const modal = new Modal({
  rootSelector: '[data-modal]',
  activeClass: 'backdrop-hidden',
  bodyClass: 'no-scroll',
  onClose: () => {
    document.body.classList.remove('no-scroll');
  },
});

export function setupListenersModalBtn(movieId) {
  const { btnWatched, btnQueue } = getRefs();

  if (!btnWatched || !btnQueue) return;
  btnWatched.addEventListener('click', () => addToWatchedCollection(movieId));
  btnQueue.addEventListener('click', () => addToQueueCollection(movieId));
}

async function addToWatchedCollection(movieId) {
  const { listenerCard } = getRefs();
  if (location.pathname.includes('/home')) {
    console.log(location.pathname);
    await addToStorage(movieId, 'watched');
  } else {
    modal.close();
    await deleteMovie(movieId, listenerCard, 'watched');
  }
}

async function addToQueueCollection(movieId) {
  const { listenerCard } = getRefs();
  if (location.pathname.includes('/home')) {
    await addToStorage(movieId, 'queue');
  } else {
    modal.close();
    await deleteMovie(movieId, listenerCard, 'queue');
  }
}

async function addToStorage(movieId, type) {
  try {
    const movieItem = state.movies.find(movie => movie.id === movieId);
    if (!movieItem) {
      Notiflix.Notify.failure('Movie not found in state!');
      return;
    }

    if (state.sets[type].has(movieId)) {
      Notiflix.Notify.info('Movie already in library!');
      return;
    }

    state.libraryMovies = {
      ...state.libraryMovies,
      [type]: [...state.libraryMovies[type], movieItem],
    };

    state.sets[type].add(Number(movieId));

    await addMovieToLibrary({ ...movieItem }, type);

    Notiflix.Notify.success(`Movie added to ${type} list!`);
    updateModalUI(Number(movieId));
  } catch (error) {
    console.error('Error adding movie to storage:', error);
    Notiflix.Notify.failure(`Error: ${error.message}`);
  }
}
