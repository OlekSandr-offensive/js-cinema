import Handlebars from 'handlebars';
import Notiflix from 'notiflix';

export function renderTemplate(template, data = {}, container) {
  if (!container) {
    Notiflix.Notify.failure('❌ Error: container not found!');
    return;
  }

  container.innerHTML = '';
  const compiledTemplate = Handlebars.compile(template);
  container.insertAdjacentHTML('beforeend', compiledTemplate(data));
}
