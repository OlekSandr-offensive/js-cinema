import Notiflix from 'notiflix';
import { state } from '../state';
import { getRefs, fetchMovies } from '../utils';
import { homeView } from '../views/homeView';

const refs = getRefs();

async function handleLiveSearch(event) {
  event.preventDefault();
  const query = event.target.value.trim();

  if (query === state.currentQuery) return;

  state.currentQuery = query;
  state.currentPage = 1;

  try {
    await fetchMovies(query, state.currentPage);

    homeView();
  } catch (error) {
    console.error('Search error:', error);
    Notiflix.Notify.failure(
      'There was an error fetching the movies. Please try again later.'
    );
  }
}

const debouncedSearch = _.debounce(handleLiveSearch, 500);

refs.searchInput.addEventListener('input', debouncedSearch);
