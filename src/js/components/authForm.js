import { getRefs, validateInput } from '../utils';
import {
  registerUser,
  loginUser,
  logoutUser,
  signInWithGoogle,
} from '../services/authService';
import { Modal } from '../plugins';
import Notiflix from 'notiflix';

const modal = new Modal({
  rootSelector: '[data-modal]',
  activeClass: 'backdrop-hidden',
});

export async function submitSignUp(e) {
  e.preventDefault();
  const refs = getRefs();
  const email = refs.emailInput.value.trim();
  const password = refs.passwordInput.value.trim();
  if (!validateInput(email, password)) return;
  try {
    await registerUser(email, password);
    Notiflix.Notify.success('Registration successful!');
    history.pushState({ signup: 'signup' }, '', '/home');
    modal.close();
  } catch (error) {
    Notiflix.Notify.failure(`Error: ${error.message}`);
  }
}

export async function submitLogIn(e) {
  e.preventDefault();
  const refs = getRefs();
  const email = refs.emailInput.value.trim();
  const password = refs.passwordInput.value.trim();
  if (!validateInput(email, password)) return;
  try {
    await loginUser(email, password);
    Notiflix.Notify.success('Login successful!');
    history.pushState({ login: 'login' }, '', '/home');
    modal.close();
  } catch (error) {
    if (error.code === 'auth/invalid-email') {
      Notiflix.Notify.failure('Incorrect email!');
    } else if (error.code === 'auth/user-not-found') {
      Notiflix.Notify.failure('Email wrong!');
    } else if (error.code === 'auth/weak-password') {
      Notiflix.Notify.failure('Password is too weak!');
    } else if (error.code === 'auth/email-already-in-use') {
      Notiflix.Notify.failure('This email is already in use!');
    } else if (error.code === 'auth/wrong-password') {
      Notiflix.Notify.failure('Password wrong!');
    } else {
      Notiflix.Notify.failure('Unknown error. Please try again.');
    }
  }
}
export async function submitLogOut() {
  try {
    await logoutUser();
    Notiflix.Notify.success('Exit successful!');
  } catch (error) {
    Notiflix.Notify.failure(`Error: ${error.message}`);
  }
}

export async function submitSignInWithGoogle() {
  try {
    await signInWithGoogle();
    Notiflix.Notify.success('Registration successful!');
    history.pushState({ signup: 'signup' }, '', '/home');
    modal.close();
  } catch (error) {
    Notiflix.Notify.failure(`Error: ${error.message}`);
  }
}
