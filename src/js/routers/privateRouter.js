import { myLibraryView, homeView } from '../views';
import { state } from '../state';
export function privateRouter(path) {
  if (!state.isAuthenticated && path === '/library') {
    history.pushState({ library: 'library' }, '', '/home');
    homeView();
  } else {
    myLibraryView();
  }
}
