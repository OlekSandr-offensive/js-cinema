import Notiflix from 'notiflix';
import { state } from './state/state.js';
import { fetchGenres, fetchMovies } from './utils';
import { initRouter } from './routers/router.js';

async function initApp() {
  state.isLoading = true;

  try {
    await fetchGenres();

    await fetchMovies();

    initRouter();
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure('Error initializing app:', error);
  } finally {
    state.isLoading = false;
  }
}

document.addEventListener('DOMContentLoaded', initApp);
