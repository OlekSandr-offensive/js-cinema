import { homeView } from '../views';
import { openAuthModal, openSingUpModal, urlWithError } from '../components';
import { getRefs } from '../utils';
import { privateRouter } from './privateRouter.js';

const refs = getRefs();
export function initRouter() {
  refs.parentNav.addEventListener('click', routListener);
  refs.movieDetails.addEventListener('click', routListener);

  window.addEventListener('popstate', handleRouteChange);

  handleRouteChange();
}

function routListener(event) {
  const link = event.target.closest('a');

  if (!link || !link.href.startsWith(window.location.origin)) return;

  event.preventDefault();
  const route = link.getAttribute('href');
  navigateTo(route);
}

function navigateTo(path) {
  if (window.location.pathname === path) return;
  history.pushState({ route: path }, '', path);
  handleRouteChange();
}

function handleRouteChange() {
  const path = window.location.pathname;

  switch (path) {
    case '/':
      homeView();
      break;
    case '/home':
      homeView();
      break;
    case '/library':
      privateRouter(path);
      break;
    case '/login':
      openAuthModal();
      homeView();
      break;
    case '/signup':
      openSingUpModal();
      homeView();
      break;
    default:
      urlWithError();
  }
}
