import { homeView } from '../views';
import {
  openAuthModal,
  openSingUpModal,
  urlWithError,
  getLibraryCollection,
} from '../components';
import { privateRoute } from './privateRoute.js';

const base = document.querySelector('base');
const BASE_URL = base ? new URL(base.href).pathname.replace(/\/$/, '') : '';

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
  '/library/watched': () => {
    const isPrivateRoute = privateRoute('/library/watched');
    if (!isPrivateRoute) return;

    getLibraryCollection('watched');
  },
  '/library/queue': () => {
    const isPrivateRoute = privateRoute('/library/queue');
    if (!isPrivateRoute) return;

    getLibraryCollection('queue');
  },
};
export function initRouter() {
  document.body.addEventListener('click', routListener);
  window.addEventListener('popstate', handleRouteChange);

  handleRouteChange();
}

function routListener(event) {
  const link = event.target.closest('a[href]');

  if (!link || !link.href.startsWith(location.origin + `${BASE_URL}`)) return;

  const route = link.getAttribute('href');

  event.preventDefault();
  navigateTo(route);
}

export function navigateTo(path) {
  if (location.pathname === path) return;
  history.pushState({ route: path }, '', path);
  handleRouteChange();
}

export function handleRouteChange() {
  const path = location.pathname.replace(BASE_URL, '') || '/';
  const route = routes[path];

  if (route) {
    route();
  } else {
    urlWithError();
  }
}
