import { getRefs } from '../utils';
import {
  redirectError,
  passwordToggle,
  submitSignUp,
  submitLogIn,
  submitLogOut,
  submitSignInWithGoogle,
} from '../components';

const refs = getRefs();

refs.movieDetails.addEventListener('click', eventDelegation);
refs.logOutBtn.addEventListener('click', eventDelegation);

function eventDelegation(event) {
  const target = event.target.closest('button');
  if (!target) return;
  const action = target.getAttribute('data-action');

  if (action && actionsMap[action]) {
    actionsMap[action](event);
  }
}

const actionsMap = {
  'sign-up': submitSignUp,
  'toggle-password': passwordToggle,
  'log-in': submitLogIn,
  'go-back': redirectError,
  'sign-in-with-google': submitSignInWithGoogle,
  'log-out': submitLogOut,
};
