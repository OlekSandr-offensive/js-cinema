import { removeMovieFromLibrary } from '../services';
import Notiflix from 'notiflix';
import { getPathname } from '../utils';
import { state } from '../state';
import { getLibraryCollection } from './libraryCollections';
import { getRefs } from '../utils';

const { gallery } = getRefs();

export async function deleteMovieById(e) {
  if (!e.target.matches('[data-action="delete-movie"]')) return;

  const movieId = e.target.closest('li').getAttribute('data-id');
  const movieItem = e.target.closest('li');
  const type = getPathname();

  await deleteMovie(movieId, movieItem, type);
}

export async function deleteMovie(movieId, container, type) {
  if (!container) return;

  container.classList.add('fade-out');
  container.addEventListener(
    'animationend',
    async () => {
      container.remove();
      try {
        Notiflix.Notify.success('Movie deleted successfully');

        state.sets[type].delete(Number(movieId));

        state.libraryMovies[type] = state.libraryMovies[type].filter(
          m => m.id !== Number(movieId)
        );
        getLibraryCollection(type);
        await removeMovieFromLibrary(Number(movieId), type);
      } catch (error) {
        console.error('Error deleting movie:', error);
        Notiflix.Notify.failure(`Error: ${error.message}`);
      }
    },
    { once: true }
  );
}

gallery.addEventListener('click', deleteMovieById);
