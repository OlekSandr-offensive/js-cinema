import { addMovieToLibrary } from '../services/libraryService.js';
import { state } from '../state/state.js';
import Notiflix from 'notiflix';
import { getRefs, updateStorageButton } from '../utils';

export function setupListenersModalBtn(movieId) {
  const refs = getRefs();
  if (!refs.btnWatched || !refs.btnQueue) return;
  refs.btnWatched.addEventListener('click', () =>
    addToWatchedCollection(movieId)
  );
  refs.btnQueue.addEventListener('click', () => addToQueueCollection(movieId));
}

async function addToWatchedCollection(movieId) {
  updateStorageButton(movieId, 'watched');

  try {
    const movieItem = state.movies.find(movie => movie.id === movieId);
    if (!movieItem) {
      Notiflix.Notify.failure('Movie not found in state!');
      return;
    }
    await addMovieToLibrary({ ...movieItem }, 'watched');
    state.watched.add(movieId);
    updateStorageButton(movieId, 'watched');
    Notiflix.Notify.success('Movie added to watched list!');
  } catch (error) {
    Notiflix.Notify.failure(`Error: ${error.message}`);
  }
}

async function addToQueueCollection(movieId) {
  updateStorageButton(movieId, 'queue');
  try {
    const movieItem = state.movies.find(movie => movie.id === movieId);
    if (!movieItem) {
      Notiflix.Notify.failure('Movie not found in state!');
      return;
    }
    await addMovieToLibrary({ ...movieItem }, 'queue');
    state.queue.add(movieId);
    updateStorageButton(movieId, 'queue');
    Notiflix.Notify.success('Movie added to queue list!');
  } catch (error) {
    Notiflix.Notify.failure(`Error: ${error.message}`);
  }
}
