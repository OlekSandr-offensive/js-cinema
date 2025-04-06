export const state = {
  user: null,
  movies: [],
  genres: [],
  sets: {
    watchedIds: new Set(),
    queueIds: new Set(),
  },
  libraryMovies: {
    watched: [],
    queue: [],
  },
  currentQuery: '',
  totalPages: 0,
  currentPage: 1,
  isLoading: false,
  isAuthenticated: Boolean,
};
