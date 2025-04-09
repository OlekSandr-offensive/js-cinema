import authFormTpl from 'bundle-text:../../templates/authFormTpl.hbs';
import { getRefs, renderTemplate } from '../utils';
import { Modal } from '../plugins';
import { navigateTo } from '../routers';

const { movieDetails } = getRefs();

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
    navigateTo('/home');
  },
});

function renderAuthModal() {
  movieDetails.innerHTML = '';
  return renderTemplate(authFormTpl, {}, movieDetails);
}

export function openAuthModal() {
  modal.open();
}
