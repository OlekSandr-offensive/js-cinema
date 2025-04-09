import signUpFormTpl from 'bundle-text:../../templates/signUpFormTpl.hbs';
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
  closeOnOverlayClick: false,
  closeOnEscape: false,
  onOpen: () => {
    renderSignUpModal();
  },
  onClose: () => {
    navigateTo('/home');
  },
});

function renderSignUpModal() {
  movieDetails.innerHTML = '';
  return renderTemplate(signUpFormTpl, {}, movieDetails);
}

export function openSingUpModal() {
  modal.open();
}
