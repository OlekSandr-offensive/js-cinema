import filmListCard from 'bundle-text:../../templates/filmListCard.hbs';
import { renderTemplate } from '../utils/';
export function renderMovieCards(movies, container) {
  renderTemplate(filmListCard, { movies }, container);
}
