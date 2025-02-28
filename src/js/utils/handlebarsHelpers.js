import Handlebars from 'handlebars';

Handlebars.registerHelper('round', value => Number(value).toFixed(2));

Handlebars.registerHelper('slice', value =>
  value ? value.slice(0, 4) : value
);

Handlebars.registerHelper('getGenreNames', function (genreIds, options) {
  const genres = options.data.root.genres;

  if (!Array.isArray(genres)) return 'Unknown';

  const genreNames = genreIds
    .map(id => genres.find(g => g.id === id)?.name || 'Unknown')
    .join(', ');

  return genreNames;
});

export default Handlebars;
