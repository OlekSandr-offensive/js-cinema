import axios from 'axios';
import Notiflix from 'notiflix';

const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
});

api.interceptors.response.use(
  response => response,
  error => {
    const errorMessage =
      error.response?.data?.status_message ||
      'An error occurred during the request';

    Notiflix.Notify.failure(errorMessage);

    return Promise.reject(error);
  }
);

export async function getPopularMovies(page = 1) {
  try {
    const response = await api.get('/trending/movie/day', {
      params: { page },
    });
    return response.data;
  } catch (error) {
    Notiflix.Notify.failure('Failed to load movies. Please try again.');
  }
}

export async function getMovieGenres() {
  try {
    const response = await api.get('/genre/movie/list');
    return response.data;
  } catch (error) {
    Notiflix.Notify.failure('Failed to load movie genres. Please try again.');
    return [];
  }
}

export async function searchMovies(query, page = 1) {
  try {
    const response = await api.get('/search/movie', {
      params: { query, page },
    });
    return response.data;
  } catch (error) {
    Notiflix.Notify.failure('Failed to load movies. Please try again.');
  }
}
