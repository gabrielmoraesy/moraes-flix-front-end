import FilterMoviesHome from "./fragments/FilterMoviesHome/FilterMoviesHome";
import HeaderHome from "./fragments/HeaderHome/HeaderHome";
import MoviesHome from "./fragments/MoviesHome/MoviesHome";
import useHome from "./Home.hook";

export const Home = () => {
  const {
    movies,
    filteredMovies,
    sortedMoviesByRating,
    calculateAverageReview,
    searchTitle,
    setSearchTitle,
    genreSelected,
    setGenreSelected,
    releaseYearSelected,
    setReleaseYearSelected,
    durationSelected,
    setDurationSelected,
    loading }
    = useHome();

  return (
    <div className="pt-4 mx-auto max-w-screen-xl text-lg">
      <HeaderHome filteredMovies={filteredMovies} searchTitle={searchTitle} setSearchTitle={setSearchTitle} />

      <FilterMoviesHome
        movies={movies}
        genreSelected={genreSelected}
        setGenreSelected={setGenreSelected}
        releaseYearSelected={releaseYearSelected}
        setReleaseYearSelected={setReleaseYearSelected}
        durationSelected={durationSelected}
        setDurationSelected={setDurationSelected}
      />

      {loading && <p className="text-lg mx-8 my-4">Carregando...</ p>}
      {filteredMovies.length === 0 && <p className="text-lg mx-8 my-4">Não existem filmes em exibição.</ p>}

      <MoviesHome
        filteredMovies={filteredMovies}
        sortedMoviesByRating={sortedMoviesByRating}
        calculateAverageReview={calculateAverageReview}
      />
    </div>
  );
};
