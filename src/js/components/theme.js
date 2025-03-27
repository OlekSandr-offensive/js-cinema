import { getRefs } from '../utils';

const refs = getRefs();

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

refs.checkbox.addEventListener('change', onCheckboxChange);

function onCheckboxChange() {
  if (refs.checkbox.checked) {
    refs.body.classList.add(Theme.DARK);
    refs.body.classList.remove(Theme.LIGHT);

    localStorage.setItem('theme', Theme.DARK);
  } else {
    refs.body.classList.remove(Theme.DARK);
    refs.body.classList.add(Theme.LIGHT);

    localStorage.removeItem('theme');
    localStorage.setItem('theme', Theme.LIGHT);
  }
}

const currentTheme = localStorage.getItem('theme');
if (currentTheme === Theme.DARK) {
  refs.checkbox.checked = true;
  refs.body.classList.add(Theme.DARK);
}
