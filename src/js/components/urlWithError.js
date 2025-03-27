import urlWithErrorTpl from 'bundle-text:../../templates/urlWithErrorTpl.hbs';
import { getRefs, renderTemplate } from '../utils';
import { Modal } from '../plugins';
import { homeView } from '../views';

const modal = new Modal({
  rootSelector: '[data-modal]',
  selectors: {
    closeBtn: '[data-modal-close]',
  },
  activeClass: 'backdrop-hidden',
  closeOnOverlayClick: false,
  closeOnEscape: false,
});

const refs = getRefs();

export function urlWithError() {
  refs.gallery.innerHTML = '';
  const errorMessage = window.location.pathname;
  renderTemplate(urlWithErrorTpl, { errorMessage }, refs.movieDetails);
  if (refs.closeModalBtn) refs.closeModalBtn.remove();
  modal.open();
}

export function redirectError() {
  history.pushState({ error: 'error' }, '', '/home');
  modal.close();
  homeView();
}
