import { state } from '../state';
import movieDetailsCard from 'bundle-text:../../templates/movieDetailsCard.hbs';
import { getRefs, renderTemplate } from '../utils';
import { Modal } from '../plugins';
import Notiflix from 'notiflix';
import { updateModalUI } from './updateUI';

const refs = getRefs();

const modal = new Modal({
  rootSelector: '[data-modal]',
  selectors: {
    closeBtn: '[data-modal-close]',
  },
  activeClass: 'backdrop-hidden',
  bodyClass: 'no-scroll',
  onOpen: movieId => {
    if (!movieId) return;
    getPopularMoviesDetails(Number(movieId));
  },
});

async function getPopularMoviesDetails(movieId) {
  refs.movieDetails.innerHTML = '';
  const details = state.movies.find(movie => movie.id === movieId);
  if (!details) {
    Notiflix.Notify.failure('Movie not found. Please try again.');
    return;
  }
  const result = renderTemplate(movieDetailsCard, details, refs.movieDetails);
  return result;
}

function openMovieModal(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'IMG') return;

  const movieElement = e.target.closest('li');
  if (!movieElement) return;

  const movieId = movieElement.getAttribute('data-id');
  if (!movieId) return;

  modal.open(movieId);
  updateModalUI();
}

refs.gallery.addEventListener('click', openMovieModal);
