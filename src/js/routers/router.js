import { homeView } from '../views';
import {
  openAuthModal,
  openSingUpModal,
  urlWithError,
  getLibraryCollection,
} from '../components';
import { initLibraryState } from '../utils';
import { privateRoute } from './privateRoute.js';
import { state } from '../state';

const routes = {
  '/': () => homeView(),
  '/home': () => homeView(),
  '/login': () => {
    openAuthModal();
    homeView();
  },
  '/signup': () => {
    openSingUpModal();
    homeView();
  },
  '/library': () => privateRoute('/library'),
  '/library/watched': async () => {
    const isPrivateRoute = privateRoute('/library/watched');
    if (!isPrivateRoute) return;

    if (state.libraryMovies?.watched) {
      getLibraryCollection('watched');
    } else {
      await initLibraryState();
    }
  },
  '/library/queue': async () => {
    const isPrivateRoute = privateRoute('/library/queue');
    if (!isPrivateRoute) return;

    if (state.libraryMovies?.queue) {
      getLibraryCollection('queue');
    } else {
      await initLibraryState();
    }
  },
};
export function initRouter() {
  document.body.addEventListener('click', routListener);

  window.addEventListener('popstate', handleRouteChange);

  handleRouteChange();
}

function routListener(event) {
  const link = event.target.closest('a[href]');

  if (!link || !link.href.startsWith(window.location.origin)) return;

  const route = link.getAttribute('href');

  event.preventDefault();
  navigateTo(route);
}

export function navigateTo(path) {
  if (window.location.pathname === path) return;
  history.pushState({ route: path }, '', path);
  handleRouteChange();
}

export async function handleRouteChange() {
  const path = window.location.pathname;

  const route = routes[path];

  if (route) {
    await route();
  } else {
    urlWithError();
  }
}
