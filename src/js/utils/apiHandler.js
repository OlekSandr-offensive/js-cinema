import {
  getMovieGenres,
  getPopularMovies,
  searchMovies,
  getLibraryMovies,
} from '../services';
import { Movie } from '../models/Movie';
import { state } from '../state';

export async function initGenresState() {
  try {
    const genres = await getMovieGenres();
    state.genres = genres;
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
}

export async function initMoviesState(
  query = '',
  page = state.currentPage.home
) {
  try {
    let response;
    let totalPages;

    if (query) {
      const { results, total_pages } = await searchMovies(query, page);
      response = results;
      totalPages = total_pages;
    } else {
      const { results, total_pages } = await getPopularMovies(page);
      response = results;
      totalPages = total_pages;
    }

    state.movies = response.map(movie => new Movie(movie, state.genres));
    state.totalPages = totalPages;
    state.currentPage.home = page;

    return response;
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

    state.sets.watched = new Set(watched.map(movie => movie.id));
    state.sets.queue = new Set(queue.map(movie => movie.id));
  } catch (error) {
    console.error('Error initializing library state:', error);
    throw error;
  }
}
