import { useAuth } from "@/contexts/AuthContext/authContext";
import { IMovie } from "@/interfaces/IMovie";
import { IReview } from "@/interfaces/IReview";
import { API_INSTANCE } from "@/services/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useDashboard = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false)
    const [myMovies, setMyMovies] = useState<IMovie[]>();
    const [myReviews, setMyReviews] = useState<IReview[]>();

    const getAllMovies = async () => {
        try {
            setLoading(true)
            const response = await API_INSTANCE.get("/movies");

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

            await API_INSTANCE.delete(`/movies/${movieId}`);

            toast.success("Filme deletado com sucesso")
        } catch (error) {
            toast.error(`Erro ao deletar filme: ${error}`);
        }
    };

    const handleDeleteReview = async (reviewId: string) => {
        try {
            setMyReviews(prevState => prevState!.filter(review => review.id !== reviewId))

            await API_INSTANCE.delete(`/reviews/${reviewId}`);

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



    return { handleDeleteMovie, handleDeleteReview, loading, myMovies, myReviews }
}

export default useDashboard