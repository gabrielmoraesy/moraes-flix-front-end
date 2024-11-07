import { useAuth } from "@/contexts/AuthContext/authContext";
import { IMovie } from "@/interfaces/IMovie";
import { IReview } from "@/interfaces/IReview";
import { api } from "@/services/api";
import { ArrowsInLineVertical, ArrowsOutLineVertical } from "phosphor-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useDashboard = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false)
    const [myMovies, setMyMovies] = useState<IMovie[]>();
    const [myReviews, setMyReviews] = useState<IReview[]>();

    const [myMoviesIsOpen, setMyMoviesIsOpen] = useState(true);
    const [myReviewsIsOpen, setMyReviewsIsOpen] = useState(true);
    const [showDeleteMovieModal, setShowDeleteMovieModal] = useState(false);
    const [showDeleteReviewModal, setShowDeleteReviewModal] = useState(false);

    const getAllMovies = async () => {
        try {
            setLoading(true)
            const response = await api.get("/movies");

            return response.data
        } catch (error) {
            toast.error(`Erro ao buscar filmes: ${error}`);
        } finally {
            setLoading(false)
        }
    };

    const handleDeleteMovie = async (movieId: string) => {
        try {
            setMyMovies(prevState => prevState!.filter(movie => movie.id !== movieId))
            setMyReviews(prevState => prevState!.filter(review => review.movieId !== movieId))

            await api.delete(`/movies/${movieId}`);

            toast.success("Filme deletado com sucesso")
        } catch (error) {
            toast.error(`Erro ao deletar filme: ${error}`);
        }
    };

    const handleDeleteReview = async (reviewId: string) => {
        try {
            setMyReviews(prevState => prevState!.filter(review => review.id !== reviewId))

            await api.delete(`/reviews/${reviewId}`);

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

    }, [user]);

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

    return {
        handleDeleteMovie,
        handleDeleteReview,
        loading,
        myMovies,
        myReviews,
        renderButtonsTable,
        myMoviesIsOpen,
        myReviewsIsOpen,
        showDeleteMovieModal,
        setShowDeleteMovieModal,
        showDeleteReviewModal,
        setShowDeleteReviewModal
    }
}

export default useDashboard