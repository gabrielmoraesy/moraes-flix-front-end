import { IMovie } from "@/interfaces/IMovie";
import { IReview } from "@/interfaces/IReview";
import { API_INSTANCE } from "@/services/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useHome = (searchTitle: string) => {
    const [loading, setLoading] = useState(false);
    const [movies, setMovies] = useState<IMovie[]>([]);

    const getAllMovies = async () => {
        try {
            setLoading(true);
            const response = await API_INSTANCE.get("/movies");
            return response.data;
        } catch (error) {
            toast.error(`Erro ao buscar filmes: ${error}`);
            return [];
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        async function fetchMovies() {
            const movies = await getAllMovies();
            setMovies(movies);
        }

        fetchMovies();
    }, []);

    const filteredMovies = (movies || []).filter(movie =>
        movie.title.toLowerCase().includes(searchTitle.toLowerCase())
    );

    const calculateAverageReview = (movie: IMovie) => {
        const quantityReviews = movie?.reviews?.length || 0;
        const totalReviews = movie?.reviews?.reduce((acc: number, review: IReview) => review ? acc + review.rating : acc, 0) || 0;
        const averageReview = quantityReviews > 0 ? totalReviews / quantityReviews : 0;

        return averageReview;
    };

    const sortedMoviesByRating = [...movies]
        .map(movie => ({
            ...movie,
            averageRating: calculateAverageReview(movie)
        }))
        .sort((a, b) => b.averageRating - a.averageRating);

    return { filteredMovies, sortedMoviesByRating, calculateAverageReview, loading };
};

export default useHome;
