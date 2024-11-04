import { IMovie } from "@/interfaces/IMovie";
import { IReview } from "@/interfaces/IReview";
import { renderStars } from "@/utils/stars";
import {
  ArrowBendUpLeft,
  ArrowsInLineVertical,
  ArrowsOutLineVertical,
  Info,
  Star,
  Trash
} from "phosphor-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UseMovieDetails from "./MovieDetails.hook";
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import profileDefault from '@/assets/images/profileDefault.jpg'
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useAuth } from "@/contexts/AuthContext/authContext";
import toast from "react-hot-toast";
import axios from "axios";
import { ConfirmModal } from "@/components/Modals/ConfirmModal";

export const MovieDetails = () => {
  const { user, token } = useAuth()
  const [movie, setMovie] = useState<IMovie | null>(null);
  const { getMovieById, loading } = UseMovieDetails();
  const [tasksOpenAndClose, setTasksOpenAndClose] = useState(true)
  const [showDeleteReviewModal, setShowDeleteReviewModal] = useState(false);

  const quantityReviews = movie?.reviews?.length
  const totalReviews = movie?.reviews?.reduce((acc: number, review: IReview) => review ? acc + review.rating : acc, 0)
  const averageReview = totalReviews! / quantityReviews!;

  const starsPerReview = (reviews: IReview[]): { [key: number]: number } => {
    const starCounts: { [key: number]: number } = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    reviews.forEach((review) => {
      if (review.rating >= 1 && review.rating <= 5) {
        starCounts[review.rating] += 1; // Incrementa a contagem para a estrela correspondente
      }
    });

    return starCounts;
  };

  const starCounts = starsPerReview(movie?.reviews || []);

  useEffect(() => {
    async function fetchMovie() {
      const movie = await getMovieById();
      setMovie(movie);
    }

    fetchMovie();
  }, []);

  const handleDeleteReview = async (reviewId: string) => {
    try {
      if (movie) {
        const updatedReviews = movie.reviews.filter(review => review.id !== reviewId);

        setMovie({
          ...movie,
          reviews: updatedReviews
        });
      }

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

  console.log("movie", movie)

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex justify-between border-b-2 border-gray-300 pb-1">
          <h1 className="text-2xl font-bold">{movie?.title}</h1>
          <Link to="/">
            <ArrowBendUpLeft size={32} />
          </Link>
        </div>
        <div className="flex flex-col items-center mt-2">
          <h3 >
            Filme cadastrado por: {movie?.user?.name} | {movie?.user?.email}
          </h3>
          <p>{movie?.releaseYear} | {movie?.duration}min | {movie?.genre}</p>
          <p>{movie?.description}</p>
        </div>

        <div className="flex justify-between items-center mt-8">
          <h1 className="text-xl font-bold">Avaliações do filme</h1>
          <div className="flex items-center gap-2">
            <Info
              size={32}
            />
            {tasksOpenAndClose ? (
              <ArrowsInLineVertical size={32} />
            ) : (
              <ArrowsOutLineVertical size={32} />
            )}
          </div>
        </div>

        <div className="flex justify-between items-center py-2 px-4 rounded-2xl bg-gray-200 mt-4 dark:text-black">
          <Button className="dark:bg-gray-500 dark:text-white">Fazer uma avaliação</Button>
          <p className="text-base">Avaliações concluídas | <span className="font-bold">
            {quantityReviews}
          </span></p>
        </div>

        <div className="flex flex-col sm:flex-row gap-8 w-full">
          <div className="mt-4 sm:w-[30%] flex flex-col gap-3">
            <h1 className="font-medium">Avaliação de clientes</h1>
            <div className="flex items-center justify-between pb-2 border-b-2 border-gray-200">
              <h1 className="flex gap-2 text-3xl">{averageReview.toFixed(1) | 0}<Star color="yellow" size={32} fill="yellow" /></h1>
              <p>{quantityReviews} avaliações</p>
            </div>

            <div className="flex flex-col justify-start gap-1 w-full">
              <h1>Classificação</h1>
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-5">
                  <h1 className="flex gap-1 text-lg">
                    <p>{star}</p>
                    <Star color="yellow" size={25} fill="yellow" />
                  </h1>
                  <Progress value={quantityReviews! > 0 ? (starCounts[star] / quantityReviews!) * 100 : 0} className="h-[12px]" />
                  <p>{starCounts[star]}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 sm:w-[70%] flex flex-col gap-3">
            {movie?.reviews?.map((review: IReview) => (
              <div key={review.id} className="bg-gray-200 rounded-lg w-full p-4 flex flex-col gap-3">
                <div className="flex justify-between">
                  <div className="flex items-center gap-1.5" >
                    <Avatar className="w-[32px] h-[32px]">
                      <AvatarImage src={profileDefault} className="object-cover" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <p className="text-black">{review?.user?.name}</p>
                  </div>
                  {review.userId === user!.id && <Trash size={24} onClick={() => setShowDeleteReviewModal(true)} className="hover:text-red-500 duration-200" />}
                </div>

                <div className="flex items-center gap-2">
                  <p className="flex gap-0.2">{renderStars(review.rating)}</p>
                  <p className="text-sm dark:text-black">Avaliado em {format(review.createdAt, "d 'de' MMMM 'de' yyyy", { locale: ptBR })}</p>
                </div>
                <p className="dark:text-black">{review.comment || ""}</p>

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
              </div>
            ))}
          </div>
        </div>
      </div>


    </div>
  );
};
