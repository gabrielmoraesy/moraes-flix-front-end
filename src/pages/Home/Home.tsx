import { useState } from "react";
import { DynamicPlaceholders } from "../../components/DynamicPlaceholders";
import { AiOutlineClose } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IMovie } from "@/interfaces/IMovie";
import useHome from "./Home.hook";
import { Link } from "react-router-dom";
import { renderStars } from "@/utils/stars";

export const Home = () => {
  const [searchTitle, setSearchTitle] = useState("");
  const { filteredMovies, sortedMoviesByRating, calculateAverageReview, loading } = useHome(searchTitle);

  return (
    <div className="pt-4 mx-auto max-w-screen-xl text-lg">
      <div className="relative flex justify-between items-center mx-8 group">
        <h1 className="text-2xl font-bold">Filmes</h1>
        <input
          type="text"
          onChange={(e) => setSearchTitle(e.target.value)}
          value={searchTitle}
          className="relative w-2/3 text-base px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-gray-500 sm:w-2/5 group dark:text-black"
        />

        {searchTitle.length < 1 && (
          <span className="absolute left-[61%] transform text-base font-medium max-[640px]:hidden group-focus-within:hidden dark:text-black">
            <DynamicPlaceholders movies={filteredMovies} />
          </span>
        )}

        {searchTitle.trim() === "" ? (
          <div className="absolute right-[1%]">
            <BiSearch size={20} color={"#000"} />
          </div>
        ) : (
          <button
            className="absolute right-[1%] cursor-pointer"
            onClick={() => setSearchTitle("")}
            aria-label="Limpar"
          >
            <AiOutlineClose size={20} color={"#000"} />
          </button>
        )}
      </div>

      {loading && <p className="text-lg mx-8 my-4">Carregando...</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-8 my-8">
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
                <p>{calculateAverageReview(movie)}</p>
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

      <h1 className="text-base font-bold mx-8">Filmes recomendados</h1>

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
                <p className="text-sm">{calculateAverageReview(movie)}</p>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-8 my-8">
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
                <p>{calculateAverageReview(movie)}</p>
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
    </div>
  );
};
