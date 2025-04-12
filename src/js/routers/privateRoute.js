import { myLibraryView } from '../views';
import { state } from '../state';
import { navigateTo } from './router';
export function privateRoute(path) {
  const { isAuthenticated } = state;
  const { pathname } = window.location;
  if (!isAuthenticated && path === pathname) {
    navigateTo('/login');
    return false;
  }
  myLibraryView();
  return true;
}
