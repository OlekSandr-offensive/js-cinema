import { getRefs } from '../utils';
import { redirectError, passwordToggle } from '../components';

const refs = getRefs();

refs.movieDetails.addEventListener('click', eventDelegation);

function eventDelegation(event) {
  event.preventDefault();
  const action = event.target.getAttribute('data-action');

  if (action && actionsMap[action]) {
    actionsMap[action]();
  }
}

const actionsMap = {
  'sign-up': null,
  'toggle-password': passwordToggle,
  'log-in': null,
  'go-back': redirectError,
  'sign-in-with-google': null,
};
