import { getRefs } from '../utils';
import { state } from '../state';

export function updateHeaderUI() {
  const refs = getRefs();

  if (state.isAuthenticated) {
    refs.itemLogin.style.display = 'none';
    refs.itemLogout.style.display = 'block';
    refs.itemLibrary.style.display = 'block';
  } else {
    refs.itemLogin.style.display = 'block';
    refs.itemLogout.style.display = 'none';
    refs.itemLibrary.style.display = 'none';
  }
}

export function updateModalUI() {
  const refs = getRefs();
  if (state.isAuthenticated) {
    refs.UiWatchedBtn.style.display = 'block';
    refs.UiQueueBtn.style.display = 'block';
    refs.itemSignIn.style.display = 'none';
  } else {
    refs.UiWatchedBtn.style.display = 'none';
    refs.UiQueueBtn.style.display = 'none';
    refs.itemSignIn.style.display = 'flex';
  }
}
