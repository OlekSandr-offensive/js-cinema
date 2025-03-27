export class Movie {
  constructor(data, { genres }) {
    this.backdropPath = data.backdrop_path;
    this.id = data.id;
    this.title = data.title;
    this.originalTitle = data.original_title;
    this.poster = data.poster_path;
    this.genres = this.getGenreNames(data.genre_ids, genres);
    this.releaseDate = this.getYearFromDate(data.release_date);
    this.rating = this.roundToFixed(data.vote_average);
    this.overview = data.overview;
    this.popularity = this.roundToFixed(data.popularity);
    this.voteCount = data.vote_count;
  }

  getGenreNames(genreIds, genres) {
    if (!Array.isArray(genreIds)) return 'Unknown';
    return (
      genreIds
        .map(id => genres.find(genre => genre.id === id)?.name)
        .join(', ') || 'Unknown'
    );
  }

  roundToFixed(value) {
    return value ? Number(value).toFixed(2) : '0.00';
  }

  getYearFromDate(value) {
    return value ? value.slice(0, 4) : 'N/A';
  }
}
