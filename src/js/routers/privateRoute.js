import { homeView, myLibraryView } from '../views';
import { state } from '../state';
import { navigateTo } from './router';
export function privateRoute(path) {
  const { isAuthenticated } = state;
  const { pathname } = window.location;
  if (!isAuthenticated && path === pathname) {
    // Redirect to login page if not authenticated and trying to access a private route
    navigateTo('/login');
    return false;
  }
  myLibraryView();
  return true;
}
