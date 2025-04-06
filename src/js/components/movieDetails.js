import { state } from '../state';
import movieDetailsCard from 'bundle-text:../../templates/movieDetailsCard.hbs';
import {
  getRefs,
  renderTemplate,
  updateStorageButton,
  changeModalBtn,
} from '../utils';
import { Modal } from '../plugins';
import Notiflix from 'notiflix';
import { updateModalUI } from './updateUI';
import { setupListenersModalBtn } from './addToStorage';

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
    setupListenersModalBtn(Number(movieId));
    if (window.location.pathname.includes('/home')) {
      updateStorageButton(Number(movieId), 'watched');
      updateStorageButton(Number(movieId), 'queue');
    } else if (window.location.pathname.includes('/library/watched')) {
      changeModalBtn('watched');
    } else if (window.location.pathname.includes('/library/queue')) {
      changeModalBtn('queue');
    }
  },
});

async function getPopularMoviesDetails(movieId) {
  refs.movieDetails.innerHTML = '';
  if (window.location.pathname.includes('/home')) {
    const details = state.movies.find(movie => movie.id === movieId);
    if (!details) {
      Notiflix.Notify.failure('Movie not found. Please try again.');
      return;
    }
    renderTemplate(movieDetailsCard, details, refs.movieDetails);
  } else if (window.location.pathname.includes('/library/watched')) {
    const details = state.libraryMovies.watched.find(
      movie => movie.id === movieId
    );
    if (!details) {
      Notiflix.Notify.failure('Movie not found. Please try again.');
      return;
    }
    renderTemplate(movieDetailsCard, details, refs.movieDetails);
  } else if (window.location.pathname.includes('/library/queue')) {
    const details = state.libraryMovies.queue.find(
      movie => movie.id === movieId
    );
    if (!details) {
      Notiflix.Notify.failure('Movie not found. Please try again.');
      return;
    }
    renderTemplate(movieDetailsCard, details, refs.movieDetails);
  }
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
