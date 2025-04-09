export const state = {
  user: null,
  movies: [],
  genres: [],
  sets: {
    watched: new Set(),
    queue: new Set(),
  },
  libraryMovies: {
    watched: [],
    queue: [],
  },
  currentQuery: '',
  totalPages: 0,
  currentPage: {
    home: 1,
    watched: 1,
    queue: 1,
  },
  isLoading: Boolean,
  isAuthenticated: Boolean,
};
