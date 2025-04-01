export const state = {
  user: null,
  movies: [],
  libraryMovies: [],
  genres: [],
  watched: new Set(),
  queue: new Set(),
  currentQuery: '',
  totalPages: 0,
  currentPage: 1,
  isLoading: false,
  isAuthenticated: Boolean,
};
