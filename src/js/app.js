import Handlebars from 'handlebars';
import Notiflix from 'notiflix';
import getRefs from './utils/getRefs.js';
import {
  getPopularMovies,
  getMovieGenres,
  searchMovies,
} from './services/apiService.js';
import filmListCard from 'bundle-text:../templates/filmListCard.hbs';
import { renderPagination } from './components/pagination.js';
import './utils/handlebarsHelpers.js';

const refs = getRefs();

const filmListTemplate = Handlebars.compile(filmListCard);

let genres = [];
let currentPage = 1;
let totalPages = 0;

async function renderMovies(page) {
  currentPage = page;
  refs.gallery.innerHTML = '';
  try {
    const [genresData, moviesData] = await Promise.all([
      getMovieGenres(),
      getPopularMovies(page),
    ]);

    totalPages = moviesData.total_pages;
    genres = genresData.genres;

    const context = {
      movies: moviesData.results,
      genres,
    };
    refs.gallery.insertAdjacentHTML('beforeend', filmListTemplate(context));
    refs.pagination.innerHTML = '';

    renderPagination(currentPage, totalPages);
  } catch (error) {
    Notiflix.Notify.failure(error);
  }
}

async function onSearchMovies(e) {
  e.preventDefault();
  refs.gallery.innerHTML = '';
  try {
    const searchQuery = e.target.value.trim();

    if (searchQuery === '') {
      return renderMovies(currentPage);
    }
    const data = await searchMovies(searchQuery);
    console.log(data);
    if (data.results.length === 0) {
      return Notiflix.Notify.failure('No results. Please enter a valid query');
    }
    const context = {
      movies: data.results,
      genres,
    };
    refs.gallery.insertAdjacentHTML('beforeend', filmListTemplate(context));
    refs.pagination.innerHTML = '';
    renderPagination(currentPage, totalPages);
  } catch (error) {
    Notiflix.Notify.failure(error);
    console.log(error.message);
  }
}

function clickOnBtn(e) {
  if (e.target.tagName === 'BUTTON') {
    const newPage = Number(e.target.dataset.page);
    renderMovies(newPage);
  }
}

//pagination buttons listener
refs.pagination.addEventListener('click', clickOnBtn);

window.addEventListener(
  'resize',
  _.debounce(() => {
    refs.pagination.innerHTML = '';
    renderPagination(currentPage, totalPages);
  }, 250)
);

refs.searchForm.addEventListener('input', _.debounce(onSearchMovies, 500));
renderMovies(currentPage);
