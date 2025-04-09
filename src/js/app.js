import Notiflix from 'notiflix';
import { state } from './state/state.js';
import { initGenresState, initMoviesState } from './utils';
import { initRouter } from './routers/router.js';
import { listenForAuthChanges } from './services';
import { showSpinner } from './components';

async function initApp() {
  state.isLoading = true;
  showSpinner();

  try {
    await initGenresState();
    await initMoviesState();

    listenForAuthChanges();

    initRouter();
  } catch (error) {
    console.error('Error initializing app:', error);
    Notiflix.Notify.failure('Error initializing app:', error);
  } finally {
    setTimeout(() => {
      state.isLoading = false;
      showSpinner();
    }, 600);
  }
}

document.addEventListener('DOMContentLoaded', initApp);
