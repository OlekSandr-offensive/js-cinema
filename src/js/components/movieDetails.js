import { state } from '../state';
import movieDetailsCard from 'bundle-text:../../templates/movieDetailsCard.hbs';
import { getRefs, renderTemplate, getPathname } from '../utils';
import { Modal } from '../plugins';
import Notiflix from 'notiflix';
import { updateModalUI } from './updateUI';
import { setupListenersModalBtn } from './addToStorage';

const { movieDetails, gallery } = getRefs();

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
    setupListenersModalBtn(Number(movieId));
    updateModalUI(Number(movieId));
  },
});

function getPopularMoviesDetails(movieId) {
  const type = getPathname();
  movieDetails.innerHTML = '';

  let details;

  if (window.location.pathname.includes('/home')) {
    details = state.movies.find(movie => movie.id === movieId);
  } else if (window.location.pathname.includes('/library/watched')) {
    details = state.libraryMovies[type].find(movie => movie.id === movieId);
  } else if (window.location.pathname.includes('/library/queue')) {
    details = state.libraryMovies[type].find(movie => movie.id === movieId);
  }

  if (!details) {
    Notiflix.Notify.failure('Movie not found. Please try again.');
    return;
  }
  renderTemplate(movieDetailsCard, details, movieDetails);
}

function openMovieModal(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'IMG') return;

  const movieElement = e.target.closest('li');
  if (!movieElement) return;

  const movieId = movieElement.getAttribute('data-id');
  if (!movieId) return;

  modal.open(movieId);
}

gallery.addEventListener('click', openMovieModal);
