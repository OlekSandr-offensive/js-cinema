import { getMovieGenres, getPopularMovies, searchMovies } from '../services';
import { Movie } from '../models/Movie';
import { state } from '../state';

export async function fetchGenres() {
  try {
    const genres = await getMovieGenres();
    state.genres = genres;
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
}

export async function fetchMovies(query = '', page = 1) {
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
