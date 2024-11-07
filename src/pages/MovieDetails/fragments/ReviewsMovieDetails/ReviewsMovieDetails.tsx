import profileDefault from '@/assets/images/profileDefault.jpg'
import ActionsReviewDropDown from "@/components/DropDown/ActionsReviewDropDown/ActionsReviewDropDown"
import { ConfirmModal } from "@/components/Modals/ConfirmModal"
import { CreateOrEditReviewModal } from "@/components/Modals/CreateOrEditReviewModal"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from '@/contexts/AuthContext/authContext'
import { IMovie } from "@/interfaces/IMovie"
import { IReview } from "@/interfaces/IReview"
import { renderStars } from "@/utils/stars"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface ReviewsMovieDetailsProps {
    movie: IMovie | null
    showDeleteReviewModal: boolean
    setShowDeleteReviewModal: React.Dispatch<React.SetStateAction<boolean>>
    showEditReviewModal: boolean
    setShowEditReviewModal: React.Dispatch<React.SetStateAction<boolean>>
    handleDeleteReview: (reviewId: string) => void
}

const ReviewsMovieDetails = (
    {
        movie,
        showDeleteReviewModal,
        setShowDeleteReviewModal,
        showEditReviewModal,
        setShowEditReviewModal,
        handleDeleteReview
    }: ReviewsMovieDetailsProps
) => {
    const { user } = useAuth()

    return (
        <div className="mt-2 sm:mt-4 sm:w-[70%] flex flex-col gap-3">
            {movie?.reviews.length === 0 && <p>Seja o primeiro a avaliar este filme!</p>}

            {movie?.reviews?.map((review: IReview) => (
                <div key={review.id} className="dark:bg-neutral-900 dark:rounded-lg w-full p-4 flex flex-col gap-3 border-b border-neutral-200 dark:border-none">
                    <div className="flex justify-between">
                        <div className="flex items-center gap-1.5" >
                            <Avatar className="w-[32px] h-[32px]">
                                <AvatarImage src={profileDefault} className="object-cover" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <p>{review?.user?.name}</p>
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
                        <p className="text-xs sm:text-sm">Avaliado em {format(review.createdAt, "d 'de' MMMM 'de' yyyy", { locale: ptBR })}</p>
                    </div>
                    <p>
                        {review.comment || ""}
                    </p>
                </div>
            ))}
        </div>
    )
}

export default ReviewsMovieDetails