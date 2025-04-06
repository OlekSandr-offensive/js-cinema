import {
  getMovieGenres,
  getPopularMovies,
  searchMovies,
  getLibraryMovies,
} from '../services';
import { Movie } from '../models/Movie';
import { state } from '../state';
import { saveToLocal, loadFromLocal } from './localStorage';

export async function initGenresState() {
  try {
    const genres = await getMovieGenres();
    state.genres = genres;
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
}

export async function initMoviesState(query = '', page = 1) {
  try {
    let results;
    let totalPages;

    if (query) {
      const searchResults = await searchMovies(query, page);
      results = searchResults.results;
      totalPages = searchResults.total_pages;
    } else {
      const popularMovies = await getPopularMovies(page);
      results = popularMovies.results;
      totalPages = popularMovies.total_pages;
    }

    state.movies = results.map(movie => new Movie(movie, state.genres));
    state.totalPages = totalPages;
    state.currentPage = page;

    return results;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
}

export async function initLibraryState() {
  try {
    const { watched, queue } = await getLibraryMovies();

    state.libraryMovies.watched = watched;
    state.libraryMovies.queue = queue;

    state.watched = new Set(watched.map(movie => movie.id));
    state.queue = new Set(queue.map(movie => movie.id));

    saveToLocal({ watched, queue }, 'library');
  } catch (error) {
    console.error('Error initializing library state:', error);
    throw error;
  }
}

export function initLibraryFromStorage() {
  const { watched, queue } = loadFromLocal('library') || [];

  const user = loadFromLocal('user') || null;

  if (user) {
    state.user = user;
    state.isAuthenticated = true;
  }

  state.libraryMovies.watched = watched;
  state.libraryMovies.queue = queue;

  state.watched = new Set(watched.map(movie => movie.id));
  state.queue = new Set(queue.map(movie => movie.id));
}
