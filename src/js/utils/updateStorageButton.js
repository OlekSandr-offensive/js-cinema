import { state } from '../state';
import { getRefs } from './getRefs';
import { getStateMoviesId } from './getState';

export function updateStorageButton(movieId, type) {
  const btn = getRefsBtn(type);
  const stateSet = getStateMoviesId(type);
  const content = type === 'watched' ? 'Added to Watched' : 'Added to Queue';

  if (stateSet.has(movieId)) {
    btn.textContent = content;
    btn.disabled = true;
    btn.classList.remove('hover');
    btn.style.transform = 'none';
    btn.style.pointerEvents = 'none';
  }
}

export function changeModalBtn(type) {
  const refs = getRefs();
  const isWatched = type === 'watched';

  const activeBtn = isWatched ? refs.btnWatched : refs.btnQueue;
  const hiddenBtn = isWatched ? refs.btnQueue : refs.btnWatched;
  const content = isWatched ? 'Remove from Watched' : 'Remove from Queue';
  if (window.location.pathname === `/library/${type}`) {
    activeBtn.textContent = content;
    activeBtn.style.display = 'block';

    hiddenBtn.style.display = 'none';
  }
}

function getRefsBtn(type) {
  const refs = getRefs();
  if (!refs.btnWatched || !refs.btnQueue) return;
  const btn = type === 'watched' ? refs.btnWatched : refs.btnQueue;
  if (!btn) {
    console.error(`Button not found for type: ${type}`);
    return;
  }
  return btn;
}
