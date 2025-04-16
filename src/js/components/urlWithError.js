import urlWithErrorTpl from 'bundle-text:../../templates/urlWithErrorTpl.hbs';
import { getRefs, renderTemplate } from '../utils';
import { Modal } from '../plugins';
import { homeView } from '../views';
import { navigateTo } from '../routers';

const modal = new Modal({
  rootSelector: '[data-modal]',
  selectors: {
    closeBtn: '[data-modal-close]',
  },
  activeClass: 'backdrop-hidden',
  closeOnOverlayClick: false,
  closeOnEscape: false,
});

const { movieDetails, closeModalBtn, gallery } = getRefs();

export function urlWithError() {
  gallery.innerHTML = '';
  const errorPath = location.pathname;
  renderTemplate(urlWithErrorTpl, { errorPath }, movieDetails);
  if (closeModalBtn) closeModalBtn.remove();
  modal.open();
}

export function redirectError() {
  navigateTo('home');
  modal.close();
  homeView();
}
