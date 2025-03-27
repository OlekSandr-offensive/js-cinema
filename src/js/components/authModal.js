import authFormTpl from 'bundle-text:../../templates/authFormTpl.hbs';
import { getRefs, renderTemplate } from '../utils';
import { Modal } from '../plugins';

const refs = getRefs();

const modal = new Modal({
  rootSelector: '[data-modal]',
  selectors: {
    closeBtn: '[data-modal-close]',
  },
  activeClass: 'backdrop-hidden',
  bodyClass: 'no-scroll',
  onOpen: () => {
    renderAuthModal();
  },
  onClose: () => {
    history.pushState({ login: 'login' }, '', '/home');
  },
});

function renderAuthModal() {
  refs.movieDetails.innerHTML = '';
  return renderTemplate(authFormTpl, {}, refs.movieDetails);
}

export function openAuthModal() {
  modal.open();
}
