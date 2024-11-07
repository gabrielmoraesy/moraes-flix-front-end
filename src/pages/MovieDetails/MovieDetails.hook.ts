import { useAuth } from "@/contexts/AuthContext/authContext";
import { IMovie } from "@/interfaces/IMovie";
import { IReview } from "@/interfaces/IReview";
import { api } from "@/services/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const UseMovieDetails = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [movie, setMovie] = useState<IMovie | null>(null);
    const [showCreateReviewModal, setShowCreateReviewModal] = useState(false)
    const [showEditReviewModal, setShowEditReviewModal] = useState(false);
    const [myReviewsIsOpen, setMyReviewsIsOpen] = useState(true);
    const [showDeleteReviewModal, setShowDeleteReviewModal] = useState(false);


    const getMovieById = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/movies/${id}`);
            setMovie(response.data);
        } catch (error) {
            toast.error(`Erro ao buscar filmes: ${error}`);
        } finally {
            setLoading(false);
        }
    };

    const quantityReviews = movie?.reviews?.length || 0;
    const totalReviews = movie?.reviews?.reduce((acc: number, review: IReview) => review ? acc + review.rating : acc, 0) || 0;
    const averageReview = quantityReviews > 0 ? totalReviews / quantityReviews : 0;

    const formattedAverageReview = Number.isNaN(averageReview) ? "0" : averageReview.toFixed(1);

    const starsPerReview = (reviews: IReview[]): { [key: number]: number } => {
        const starCounts: { [key: number]: number } = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

        reviews.forEach((review) => {
            if (review.rating >= 1 && review.rating <= 5) {
                starCounts[review.rating] += 1;
            }
        });

        return starCounts;
    };

    const starCounts = starsPerReview(movie?.reviews || []);

    const handleDeleteReview = async (reviewId: string) => {
        try {
            if (movie) {
                const updatedReviews = movie.reviews.filter(review => review.id !== reviewId);

                setMovie({
                    ...movie,
                    reviews: updatedReviews
                });
            }

            await api.delete(`/reviews/${reviewId}`);

            toast.success("Avaliação deletada com sucesso");
        } catch (error) {
            toast.error(`Erro ao deletar avaliação: ${error}`);
        }
    };

    const checkUserReview = () => {
        const userReview = movie?.reviews.find((review: IReview) => review.userId === user?.id);

        if (userReview) {
            toast.error("Você já fez uma avaliação sobre este filme. Você pode editar ou deletar sua avaliação.");
            return
        }

        setShowCreateReviewModal(true)
    };

    useEffect(() => {
        getMovieById();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showCreateReviewModal, showEditReviewModal]);

    return {
        movie,
        loading,
        handleDeleteReview,
        quantityReviews,
        formattedAverageReview,
        starsPerReview,
        checkUserReview,
        showCreateReviewModal,
        setShowCreateReviewModal,
        showEditReviewModal,
        setShowEditReviewModal,
        myReviewsIsOpen,
        setMyReviewsIsOpen,
        showDeleteReviewModal,
        setShowDeleteReviewModal,
        starCounts
    };
}

export default UseMovieDetails;
