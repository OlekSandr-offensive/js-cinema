import Notiflix from 'notiflix';
import { state } from '../state';
import {
  getRefs,
  initMoviesState,
  renderPagination,
  getPathname,
} from '../utils';
import { renderMovieCards } from './movieCard';
import { showSpinner } from './spinner';

const { gallery, searchInput } = getRefs();

async function handleLiveSearch(event) {
  event.preventDefault();
  const query = event.target.value.trim();

  if (query === state.currentQuery) return;

  const type = getPathname();

  state.currentQuery = query;
  state.currentPage[type] = 1;

  state.isLoading = true;
  showSpinner(true);

  try {
    await initMoviesState(query, state.currentPage[type]);

    renderMovieCards(state.movies, gallery);
    renderPagination();
  } catch (error) {
    console.error('Search error:', error);
    Notiflix.Notify.failure(
      'There was an error fetching the movies. Please try again later.'
    );
  } finally {
    state.isLoading = false;
    showSpinner();
  }
}

const debouncedSearch = _.debounce(handleLiveSearch, 500);

searchInput.addEventListener('input', debouncedSearch);
