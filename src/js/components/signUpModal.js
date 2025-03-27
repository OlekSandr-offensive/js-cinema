import signUpFormTpl from 'bundle-text:../../templates/signUpFormTpl.hbs';
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
  closeOnOverlayClick: false,
  closeOnEscape: false,
  onOpen: () => {
    renderSignUpModal();
  },
  onClose: () => {
    history.pushState({ signup: 'signup' }, '', '/home');
  },
});

function renderSignUpModal() {
  refs.movieDetails.innerHTML = '';
  return renderTemplate(signUpFormTpl, {}, refs.movieDetails);
}

export function openSingUpModal() {
  modal.open();
}
