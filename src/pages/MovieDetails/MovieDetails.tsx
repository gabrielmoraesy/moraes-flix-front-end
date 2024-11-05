import profileDefault from '@/assets/images/profileDefault.jpg';
import ActionsReviewDropDown from '@/components/DropDown/ActionsReviewDropDown/ActionsReviewDropDown';
import { ConfirmModal } from "@/components/Modals/ConfirmModal";
import { CreateOrEditReviewModal } from '@/components/Modals/CreateOrEditReviewModal';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext/authContext";
import { IReview } from "@/interfaces/IReview";
import { renderStars } from "@/utils/stars";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  ArrowBendUpLeft,
  ArrowsInLineVertical,
  ArrowsOutLineVertical,
  Info,
  Star
} from "phosphor-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UseMovieDetails from "./MovieDetails.hook";

export const MovieDetails = () => {
  const navigate = useNavigate();
  const { user } = useAuth()
  const [myReviewsIsOpen, setMyReviewsIsOpen] = useState(true);
  const [showDeleteReviewModal, setShowDeleteReviewModal] = useState(false);

  const
    { movie,
      loading,
      handleDeleteReview,
      quantityReviews,
      formattedAverageReview,
      starsPerReview,
      checkUserReview,
      showCreateReviewModal,
      setShowCreateReviewModal,
      showEditReviewModal,
      setShowEditReviewModal
    } = UseMovieDetails();

  const starCounts = starsPerReview(movie?.reviews || []);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto p-4 sm:p-8">
        <div className="flex justify-between items-center border-b-2 border-gray-300 pb-1">
          <h1 className="text-lg sm:text-2xl font-bold">{movie?.title}</h1>
          <Button onClick={() => navigate(-1)}>
            <ArrowBendUpLeft size={32} />
          </Button >
        </div>
        <div className="flex flex-col items-center mt-2 gap-2.5 sm:gap-2">
          <h3>
            Filme cadastrado por: {movie?.user?.name} | {movie?.user?.email}
          </h3>
          <p>{movie?.releaseYear} | {movie?.duration}min | {movie?.genre}</p>
          <p><span className='font-bold'>Sinopse:</span> {movie?.description}</p>
        </div>

        {loading && <p className="text-lg my-1 mx-2">Carregando...</p>}

        <div className="flex justify-between items-center mt-4 sm:mt-8">
          <h1 className="text-lg sm:text-xl font-bold">Avaliações do filme</h1>
          <div className="flex items-center gap-2">
            <Info
              size={32}
            />
            {myReviewsIsOpen ? (
              <ArrowsInLineVertical size={32} onClick={() => setMyReviewsIsOpen(false)} />
            ) : (
              <ArrowsOutLineVertical size={32} onClick={() => setMyReviewsIsOpen(true)} />
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:gap-0 sm:flex-row justify-between items-center py-2 px-4 rounded-2xl bg-gray-200 mt-2 sm:mt-4 dark:text-black">
          <Button
            className="dark:bg-gray-500 dark:text-white text-sm sm:text-base"
            onClick={() => checkUserReview()}
          >
            Fazer uma avaliação
          </Button>

          <CreateOrEditReviewModal open={showCreateReviewModal} setOpen={setShowCreateReviewModal} movie={movie} variant="create" />

          <p className="text-sm sm:text-base">Avaliações concluídas | <span className="font-bold">
            {quantityReviews}
          </span></p>
        </div>

        <div className={`flex flex-col sm:flex-row gap-8 w-full ${myReviewsIsOpen ? "flex" : "hidden"}`}>
          <div className="mt-4 sm:w-[30%] flex flex-col gap-3">
            <h1 className="font-medium text-sm sm:text-base">Avaliação de clientes</h1>
            <div className="flex items-center justify-between pb-2 border-b-2 border-gray-200">
              <h1 className="flex gap-2 text-3xl">{formattedAverageReview}<Star color="yellow" size={32} fill="yellow" /></h1>
              <p>{quantityReviews} {quantityReviews === 1 ? "avaliação" : "avaliações"}</p>
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

          <div className="mt-2 sm:mt-4 sm:w-[70%] flex flex-col gap-3">
            {movie?.reviews.length === 0 && <p>Seja o primeiro a avaliar este filme!</p>}

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
                  {review.userId === user!.id &&
                    <ActionsReviewDropDown
                      setShowDeleteReviewModal={setShowDeleteReviewModal}
                      setShowEditReviewModal={setShowEditReviewModal}
                    />
                  }

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

                  {showEditReviewModal && (
                    <CreateOrEditReviewModal open={showEditReviewModal} setOpen={setShowEditReviewModal} movie={movie} variant="edit" />
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <p className="flex gap-0.2">{renderStars(review.rating)}</p>
                  <p className="text-xs sm:text-sm dark:text-black">Avaliado em {format(review.createdAt, "d 'de' MMMM 'de' yyyy", { locale: ptBR })}</p>
                </div>
                <p className="dark:text-black">
                  {review.comment || ""}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>


    </div >
  );
};
