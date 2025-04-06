import { removeMovieFromLibrary } from '../services';
import Notiflix from 'notiflix';
import {
  getStateMoviesId,
  getStateMovies,
  saveToLocal,
  getPathname,
} from '../utils';
import { state } from '../state';

export async function deleteMovieById(e) {
  if (!e.target.matches('[data-action="delete-movie"]')) return;

  const movieId = e.target.closest('li').getAttribute('data-id');
  const movieItem = e.target.closest('li');

  await deleteMovieByIdOnModal(movieId, movieItem);
}

export async function deleteMovieByIdOnModal(movieId, container) {
  container = document.querySelector(`[data-id="${movieId}"]`);
  if (!container) return;

  container.classList.add('fade-out');

  container.addEventListener(
    'animationend',
    async () => {
      container.remove();
      try {
        Notiflix.Notify.success('Movie deleted successfully');

        const type = getPathname();

        getStateMoviesId(type).delete(movieId);
        state.libraryMovies[type] = getStateMovies(type).filter(
          m => m.id !== movieId
        );
        saveToLocal({ ...state.libraryMovies }, 'library');

        await removeMovieFromLibrary(movieId, type);
      } catch (error) {
        console.error('Error deleting movie:', error);
        Notiflix.Notify.failure(`Error: ${error.message}`);
      }
    },
    { once: true }
  );
}
