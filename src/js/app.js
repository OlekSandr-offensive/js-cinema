import Notiflix from 'notiflix';
import { state } from './state/state.js';
import {
  initGenresState,
  initMoviesState,
  initLibraryState,
  initLibraryFromStorage,
  saveToLocal,
} from './utils';
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
      const userData = { uid: user.uid, email: user.email };
      saveToLocal(userData, 'user');
      state.user = userData;
      state.isAuthenticated = true;

      await initLibraryState();
    } else {
      state.user = null;
      state.isAuthenticated = false;

      initLibraryFromStorage();
    }

    updateHeaderUI();

    initRouter();
  } catch (error) {
    console.error('Error initializing app:', error);
    Notiflix.Notify.failure('Error initializing app:', error);
  } finally {
    state.isLoading = false;
    showSpinner();
  }
}

document.addEventListener('DOMContentLoaded', initApp);
