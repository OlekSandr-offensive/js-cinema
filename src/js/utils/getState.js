import { state } from '../state';
export function getStateMoviesId(type) {
  const { watchedIds, queueIds } = state.sets;
  return type === 'watched' ? watchedIds : queueIds;
}

export function getStateMovies(type) {
  const { watched, queue } = state.libraryMovies;
  return type === 'watched' ? watched : queue;
}
