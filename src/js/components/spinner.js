import { state } from '../state';

class Spinner {
  constructor({ noBackground = false } = {}) {
    this.noBackground = noBackground;
    this.ref = document.querySelector('.spinner');
  }

  enable() {
    if (this.noBackground) {
      this.ref.classList.add('no-background');
      document.body.classList.add('no-background');
    } else {
      this.ref.classList.remove('no-background');
      document.body.classList.remove('no-background');
    }
    document.body.classList.add('loading');
    this.ref.classList.remove('hidden');
  }

  disable() {
    document.body.classList.remove('loading', 'finished');
    document.body.classList.add('finished');
    this.ref.classList.add('hidden');
  }
}

export function showSpinner(noBackground) {
  const spinner = new Spinner({ noBackground });
  if (state.isLoading) {
    spinner.enable();
  } else {
    spinner.disable();
  }
}
