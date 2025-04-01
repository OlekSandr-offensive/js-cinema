import Notiflix from 'notiflix';
import { state } from './state/state.js';
import { initGenresState, initMoviesState, initLibraryState } from './utils';
import { initRouter } from './routers/router.js';
import { waitForUserAuth } from './services';
import { updateHeaderUI, showSpinner } from './components';

async function initApp() {
  state.isLoading = true;
  showSpinner();

  try {
    await initGenresState();

    await initMoviesState();

    const user = await waitForUserAuth();
    if (user) {
      state.user = { uid: user.uid, email: user.email };
      state.isAuthenticated = true;
      await initLibraryState();
    } else {
      state.user = null;
      state.isAuthenticated = false;
    }

    updateHeaderUI();

    initRouter();
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure('Error initializing app:', error);
  } finally {
    state.isLoading = false;
    showSpinner();
  }
}

document.addEventListener('DOMContentLoaded', initApp);
