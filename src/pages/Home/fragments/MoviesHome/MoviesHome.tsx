import { IMovie } from '@/interfaces/IMovie';
import { renderStars } from '@/utils/stars';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

interface MoviesHomeProps {
    filteredMovies: IMovie[];
    sortedMoviesByRating: IMovie[];
    calculateAverageReview: (movie: IMovie) => number;
}

const MoviesHome = ({ filteredMovies, sortedMoviesByRating, calculateAverageReview }: MoviesHomeProps) => {
    return (
        <Fragment>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mx-8 my-8">
                {filteredMovies.slice(0, 6).map((movie: IMovie) => (
                    <div
                        key={movie.id}
                        className="flex flex-col justify-between items-center p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow min-h-[250px] dark:bg-neutral-900"
                    >
                        <div className="flex flex-col items-center gap-2">
                            <h2 className="text-xl font-bold">{movie.title}</h2>
                            <p className="text-sm">{movie.releaseYear} | {movie.duration}min | {movie.genre}</p>
                            <div className="flex gap-2 items-center">
                                <p className="flex">{renderStars(calculateAverageReview(movie))}</p>
                                <p>{calculateAverageReview(movie).toFixed(1)}</p>
                            </div>
                        </div>

                        <Link
                            to={`/movies/${movie.id}`}
                            className="w-[50%] py-2 text-center font-bold border-2 border-black rounded-lg transition-colors hover:bg-black hover:text-white dark:border-white"
                        >
                            Ver mais
                        </Link>
                    </div>
                ))}
            </div>

            {sortedMoviesByRating.length !== 0 && <h1 className="text-base font-bold mx-8">Filmes recomendados</h1>}

            <div className="flex flex-wrap gap-2 mx-8 my-8">
                {sortedMoviesByRating.slice(0, 6).map((movie: IMovie) => (
                    <div
                        key={movie.id}
                        className="flex flex-col justify-between items-center p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow min-h-[250px] dark:bg-neutral-900 w-full sm-custom:w-[196px]"
                    >
                        <div className="flex flex-col items-center gap-2">
                            <h2 className="text-lg font-bold">{movie.title}</h2>
                            <p className="text-xs">{movie.releaseYear} | {movie.duration}min | {movie.genre}</p>
                            <div className="flex gap-2 items-center">
                                <p className="flex">{renderStars(calculateAverageReview(movie))}</p>
                                <p className="text-sm">{calculateAverageReview(movie).toFixed(1)}</p>
                            </div>
                        </div>

                        <Link
                            to={`/movies/${movie.id}`}
                            className="w-[80%] py-1 text-center font-bold border-2 border-black rounded-lg transition-colors hover:bg-black hover:text-white dark:border-white text-sm"
                        >
                            Ver mais
                        </Link>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mx-8 my-8">
                {filteredMovies.slice(6, filteredMovies.length).map((movie: IMovie) => (
                    <div
                        key={movie.id}
                        className="flex flex-col justify-between items-center p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow min-h-[250px] dark:bg-neutral-900"
                    >
                        <div className="flex flex-col items-center gap-2">
                            <h2 className="text-xl font-bold">{movie.title}</h2>
                            <p className="text-sm">{movie.releaseYear} | {movie.duration}min | {movie.genre}</p>
                            <div className="flex gap-2 items-center">
                                <p className="flex">{renderStars(calculateAverageReview(movie))}</p>
                                <p>{calculateAverageReview(movie).toFixed(1)}</p>
                            </div>
                        </div>

                        <Link
                            to={`/movies/${movie.id}`}
                            className="w-[50%] py-2 text-center font-bold border-2 border-black rounded-lg transition-colors hover:bg-black hover:text-white dark:border-white"
                        >
                            Ver mais
                        </Link>
                    </div>
                ))}
            </div>
        </Fragment>
    )
}

export default MoviesHome