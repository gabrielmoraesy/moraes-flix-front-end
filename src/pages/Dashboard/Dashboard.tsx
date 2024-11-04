// React
import { Fragment, useEffect, useState } from "react";

// Icons
import { ArrowsInLineVertical, ArrowsOutLineVertical } from "phosphor-react";
import UseHome from "../Home/Home.hook";
import { IMovie } from "@/interfaces/IMovie";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext/authContext";
import axios from "axios";
import toast from "react-hot-toast";
import { IReview } from "@/interfaces/IReview";
import { ConfirmModal } from "@/components/Modals/ConfirmModal";
import { renderStars } from '@/utils/stars'

export const Dashboard = () => {
  const { user, token } = useAuth();
  const [myMoviesIsOpen, setMyMoviesIsOpen] = useState(true);
  const [myReviewsIsOpen, setMyReviewsIsOpen] = useState(true);
  const [showDeleteMovieModal, setShowDeleteMovieModal] = useState(false);
  const [showDeleteReviewModal, setShowDeleteReviewModal] = useState(false);
  const [myMovies, setMyMovies] = useState<IMovie[]>();
  const [myReviews, setMyReviews] = useState<IReview[]>();

  const { getAllMovies, loading } = UseHome();

  const handleDeleteMovie = async (movieId: string) => {
    try {
      setMyMovies(prevState => prevState!.filter(movie => movie.id !== movieId))

      await axios.delete(`http://localhost:3333/movies/${movieId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      toast.success("Filme deletado com sucesso")
    } catch (error) {
      toast.error(`Erro ao deletar filme: ${error}`);
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    try {
      setMyReviews(prevState => prevState!.filter(review => review.id !== reviewId))

      await axios.delete(`http://localhost:3333/reviews/${reviewId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      toast.success("Avaliação deletada com sucesso")
    } catch (error) {
      toast.error(`Erro ao deletar avaliação: ${error}`);
    }
  }

  useEffect(() => {
    async function fetchMoviesAndReviews() {
      const movies = await getAllMovies();

      const myMovies: IMovie[] = movies.filter((movie: IMovie) => movie.userId === user?.id);
      setMyMovies(myMovies);

      const userReviews = movies.flatMap((movie: IMovie) =>
        movie.reviews.map((review: IReview) => ({
          ...review,
          movieTitle: movie.title
        }))
      ).filter((review: IReview) => review.userId === user!.id);

      setMyReviews(userReviews);
    }

    fetchMoviesAndReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  console.log("myMovies", myMovies)
  console.log("myReviews", myReviews)

  const renderButtonsTable = (table: "myMovies" | "myReviews") => {
    if (table === 'myMovies') {
      return myMoviesIsOpen ? (
        <ArrowsInLineVertical
          size={32}
          className="cursor-pointer"
          onClick={() => setMyMoviesIsOpen(false)}
        />
      ) : (
        <ArrowsOutLineVertical
          size={32}
          className="cursor-pointer"
          onClick={() => setMyMoviesIsOpen(true)}
        />
      );
    }

    if (table === 'myReviews') {
      return myReviewsIsOpen ? (
        <ArrowsInLineVertical
          size={32}
          className="cursor-pointer"
          onClick={() => setMyReviewsIsOpen(false)}
        />
      ) : (
        <ArrowsOutLineVertical
          size={32}
          className="cursor-pointer"
          onClick={() => setMyReviewsIsOpen(true)}
        />
      );
    }
  };

  return (
    <div className="pt-8 min-h-screen max-w-7xl mx-auto text-center">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <h3 className="text-lg font-normal">Gerencie todos os seus projetos</h3>
      <div className="flex justify-between font-bold border-b-2 border-gray-300 w-4/5 mx-auto py-2">
        <span className="text-lg">Título</span>
        <span className="text-lg">Ações</span>
      </div>

      <div className="flex justify-center items-center gap-2 mt-4 text-lg">
        Seus filmes
        {renderButtonsTable("myMovies")}
      </div>

      {loading && <p className="text-lg my-1 mx-2">Carregando...</p>}

      {myMovies && myMovies.map((movie: IMovie) => (
        <Fragment>
          <div className={`flex justify-between items-center border-b border-gray-200 w-4/5 mx-auto py-2 ${myMoviesIsOpen ? "flex" : "hidden"}`} key={movie.id}>
            <p className="text-lg">{movie.title}</p>
            <div className="flex gap-2">
              <Link
                to={`/movies/${movie.id}`}
                className="border-2 border-gray-300 rounded-md px-4 py-2 hover:bg-gray-300 dark:hover:text-black duration-200"
              >
                Ver
              </Link>
              <Link
                to={`/movies/edit/${movie.id}`}
                className="border-2 border-gray-300 rounded-md px-4 py-2 hover:bg-gray-300 dark:hover:text-black duration-200"
              >
                Editar
              </Link>
              <Button
                onClick={() => setShowDeleteMovieModal(true)}
                className="bg-red-500 text-white border-2 border-red-500 rounded-md px-4 py-2 hover:bg-red-600 hover:border-red-600 duration-200"
              >
                Excluir
              </Button>
            </div>
          </div>

          {showDeleteMovieModal && (
            <ConfirmModal
              open={showDeleteMovieModal}
              setOpen={setShowDeleteMovieModal}
              onConfirm={() => handleDeleteMovie(movie.id)}
              onCancel={() => setShowDeleteMovieModal((prevState) => !prevState)}
              title={"Excluir filme"}
              descripion={"Tem certeza que deseja excluir este filme?"}
            />
          )}
        </Fragment>
      ))}

      {myMovies && myMovies.length === 0 && (
        <div className={`mt-4 flex flex-col gap-2 items-center bg-gray-200 rounded-lg p-4 w-4/5 mx-auto ${myMoviesIsOpen ? "flex" : "hidden"}`}>
          <p className="text-lg">Você não possui nenhum filme criado</p>
          <Link to="/movies/create" className="bg-primaryBlue text-white text-center cursor-pointer rounded-[10px] font-bold border-0 py-[10px] px-[15px] text-base ml-4">
            Criar filme
          </Link>
        </div>
      )}

      <div className="flex justify-center items-center gap-2 mt-6 text-lg">
        Suas avaliações
        {renderButtonsTable("myReviews")}
      </div>

      {myReviews && myReviews.map((review: IReview) => (
        <Fragment>
          <div className={`flex justify-between items-center border-b border-gray-200 w-4/5 mx-auto py-2 ${myReviewsIsOpen ? "flex" : "hidden"}`} key={review.id}>
            <div className="flex text-lg gap-2">
              <p className="flex gap-0.2">{renderStars(review.rating)}</p>
              <p>| {review.rating}/5</p>
            </div>
            <div>{review.movieTitle}</div>
            <div className="flex gap-2">
              <Link
                to={`/movies/${review.movieId}`}
                className="border-2 border-gray-300 rounded-md px-4 py-2 hover:bg-gray-300 dark:hover:text-black duration-200"
              >
                Ver
              </Link>
              <Link
                to={`/reviews/edit/${review.id}`}
                className="border-2 border-gray-300 rounded-md px-4 py-2 hover:bg-gray-300 dark:hover:text-black duration-200"
              >
                Editar
              </Link>
              <Button
                onClick={() => setShowDeleteReviewModal(true)}
                className="bg-red-500 text-white border-2 border-red-500 rounded-md px-4 py-2 hover:bg-red-600 hover:border-red-600 duration-200"
              >
                Excluir
              </Button>
            </div>
          </div>

          {showDeleteReviewModal && (
            <ConfirmModal
              open={showDeleteReviewModal}
              setOpen={setShowDeleteReviewModal}
              onConfirm={() => handleDeleteReview(review.id)}
              onCancel={() => setShowDeleteReviewModal((prevState) => !prevState)}
              title={"Excluir avaliação"}
              descripion={"Tem certeza que deseja excluir esta avaliação?"}
            />
          )}
        </Fragment>
      ))}

      {myReviews && myReviews.length === 0 && (
        <div className={`mt-4 flex flex-col gap-2 items-center bg-gray-200 rounded-lg p-4 w-4/5 mx-auto ${myMoviesIsOpen ? "flex" : "hidden"}`}>
          <p className="text-lg">Você não possui nenhuma avaliação</p>
          <Link to="/movies/create" className="bg-primaryBlue text-white text-center cursor-pointer rounded-[10px] font-bold border-0 py-[10px] px-[15px] text-base ml-4">
            Avaliar um filme
          </Link>
        </div>
      )}
    </div>
  );
};
