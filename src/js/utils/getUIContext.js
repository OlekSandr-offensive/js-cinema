import { state } from '../state';
export function getUIContext() {
  const path = location.pathname;
  const isAuth = state.isAuthenticated;

  if (!isAuth) return 'guest';
  if (path.includes('/home')) return 'home';
  if (path.includes('/library/watched')) return 'library-watched';
  if (path.includes('/library/queue')) return 'library-queue';

  return 'unknown';
}
