import { removeMovieFromLibrary } from '../services';
import Notiflix from 'notiflix';
import { getPathname } from '../utils';
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

        state.sets[type].delete(Number(movieId));

        const updated = state.libraryMovies[type].filter(m => m.id !== movieId);
        state.libraryMovies[type] = updated;

        await removeMovieFromLibrary(movieId, type);
      } catch (error) {
        console.error('Error deleting movie:', error);
        Notiflix.Notify.failure(`Error: ${error.message}`);
      }
    },
    { once: true }
  );
}
