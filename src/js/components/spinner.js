import { state } from '../state';

class Spinner {
  constructor() {
    this.ref = this.getRef();
  }

  getRef() {
    return document.querySelector('.spinner');
  }

  disable() {
    this.ref.classList.add('visually-hidden');
  }

  enable() {
    this.ref.classList.remove('visually-hidden');
  }
}

export function showSpinner() {
  const spinner = new Spinner();
  if (state.isLoading) {
    spinner.enable();
  } else {
    spinner.disable();
  }
}
