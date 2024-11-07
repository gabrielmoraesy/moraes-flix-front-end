import { IMovie } from "@/interfaces/IMovie";
import { IReview } from "@/interfaces/IReview";
import { api } from "@/services/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useHome = () => {
    const [loading, setLoading] = useState(false);
    const [movies, setMovies] = useState<IMovie[]>([]);

    const [searchTitle, setSearchTitle] = useState("");
    const [genreSelected, setGenreSelected] = useState("");
    const [releaseYearSelected, setReleaseYearSelected] = useState("");
    const [durationSelected, setDurationSelected] = useState("");

    const getAllMovies = async () => {
        try {
            setLoading(true);
            const response = await api.get("/movies");
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

    const calculateAverageReview = (movie: IMovie) => {
        const quantityReviews = movie?.reviews?.length || 0;
        const totalReviews =
            movie?.reviews?.reduce((acc: number, review: IReview) => review ? acc + review.rating : acc, 0) || 0;
        const averageReview = quantityReviews > 0 ? totalReviews / quantityReviews : 0;

        return averageReview;
    };

    const sortedMoviesByRating = [...movies]
        .map(movie => ({
            ...movie,
            averageRating: calculateAverageReview(movie)
        }))
        .sort((a, b) => b.averageRating - a.averageRating);


    const applyFilters = () => {
        return movies!.filter(movie => {
            const matchesTitle = searchTitle
                ? movie.title.toLowerCase().includes(searchTitle.toLowerCase())
                : true;

            const matchesGenre = genreSelected ? movie.genre === genreSelected : true;

            const matchesReleaseYear = releaseYearSelected
                ? movie.releaseYear.toString() === releaseYearSelected
                : true;

            const matchesDuration = durationSelected
                ? (() => {
                    const [minDuration, maxDuration] = durationSelected
                        .replace(" minutos", "")
                        .split(" a ")
                        .map(Number);

                    return !isNaN(minDuration) && !isNaN(maxDuration) &&
                        movie.duration >= minDuration && movie.duration <= maxDuration;
                })()
                : true;

            return matchesTitle && matchesGenre && matchesReleaseYear && matchesDuration;
        });
    };

    const filteredMovies = applyFilters();

    return {
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
        loading
    };
};

export default useHome;
