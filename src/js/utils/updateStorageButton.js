import { state } from '../state';
import { getRefs } from './getRefs';

export function updateStorageButton(movieId, type) {
  const refs = getRefs();
  const btn = type === 'watched' ? refs.btnWatched : refs.btnQueue;
  const stateSet = type === 'watched' ? state.watched : state.queue;
  const content = type === 'watched' ? 'Added to Watched' : 'Added to Queue';

  if (stateSet.has(movieId)) {
    btn.textContent = content;
    btn.disabled = true;
    btn.classList.remove('hover');
    btn.style.transform = 'none';
    btn.style.pointerEvents = 'none';
  }
}
