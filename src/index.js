const redirectPath = sessionStorage.getItem('redirectAfterLoad');
if (redirectPath) {
  sessionStorage.removeItem('redirectAfterLoad');
  history.replaceState(null, '', redirectPath);
}

import './sass/main.scss';

import './js/components/theme';
import './js/components/pagination';
import './js/components/movieDetails';
import './js/components/liveSearch';
import './js/components/backToTop';
import './js/components/eventDelegation';
import './js/components/deleteMovieById';

import './js/views/homeView';
import './js/views/myLibraryView';

import './js/app';
