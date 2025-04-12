import { getUIContext, getRefs, updateButton } from '../utils';
import { state } from '../state';

export function updateHeaderUI() {
  const { itemLogin, itemLogout, itemLibrary } = getRefs();
  const context = getUIContext();
  itemLogin.classList.add('hidden');
  itemLogout.classList.add('hidden');
  itemLibrary.classList.add('hidden');

  if (context === 'guest') {
    itemLogin.classList.remove('hidden');
  } else {
    itemLogout.classList.remove('hidden');
    itemLibrary.classList.remove('hidden');
  }
}

export function updateModalUI(movieId) {
  const context = getUIContext();
  const { UiQueueBtn, UiWatchedBtn, itemSignIn, btnWatched, btnQueue } =
    getRefs();

  UiWatchedBtn.classList.add('hidden');
  UiQueueBtn.classList.add('hidden');
  itemSignIn.classList.add('hidden');

  if (context === 'guest') {
    itemSignIn.classList.remove('hidden');
    return;
  }

  switch (context) {
    case 'home':
      updateButton(btnWatched, 'watched', state.sets.watched.has(movieId));
      updateButton(btnQueue, 'queue', state.sets.queue.has(movieId));
      break;

    case 'library-watched':
      btnWatched.textContent = 'Remove from Watched';
      btnWatched.classList.remove('hidden');
      break;

    case 'library-queue':
      btnQueue.textContent = 'Remove from Queue';
      btnQueue.classList.remove('hidden');
      break;

    default:
      console.warn('Unknown UI context:', context);
  }
}

export function toggleLibraryButtons(e) {
  const btn = e.target.closest('.js-library-btn');
  if (!btn) return;

  document
    .querySelectorAll('.js-library-btn')
    .forEach(b => b.classList.remove('active'));

  btn.classList.add('active');
}
