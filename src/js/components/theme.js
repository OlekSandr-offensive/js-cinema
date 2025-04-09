import { getRefs } from '../utils';

const { checkbox, body } = getRefs();

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

checkbox.addEventListener('change', onCheckboxChange);

function onCheckboxChange() {
  if (checkbox.checked) {
    body.classList.add(Theme.DARK);
    body.classList.remove(Theme.LIGHT);

    localStorage.setItem('theme', Theme.DARK);
  } else {
    body.classList.remove(Theme.DARK);
    body.classList.add(Theme.LIGHT);

    localStorage.removeItem('theme');
    localStorage.setItem('theme', Theme.LIGHT);
  }
}

const currentTheme = localStorage.getItem('theme');
if (currentTheme === Theme.DARK) {
  checkbox.checked = true;
  body.classList.add(Theme.DARK);
}
