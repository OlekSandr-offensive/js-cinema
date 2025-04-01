import Notiflix from 'notiflix';

function isValidEmail(email) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

function isValidPassword(password) {
  return password.length >= 8 && /\d/.test(password);
}

export function validateInput(email, password) {
  let isValid = true;
  if (!isValidEmail(email)) {
    Notiflix.Notify.failure('Incorrect email!');
    isValid = false;
  }

  if (!isValidPassword(password)) {
    Notiflix.Notify.failure(
      'The password must contain at least 8 characters and at least one number!'
    );
    isValid = false;
  }
  return isValid;
}
