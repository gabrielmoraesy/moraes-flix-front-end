import { CreateOrEditReviewModal } from "@/components/Modals/CreateOrEditReviewModal"
import { Button } from "@/components/ui/button"
import { IMovie } from "@/interfaces/IMovie";

interface HeaderReviewsMovieDetailsProps {
    checkUserReview: () => void;
    showCreateReviewModal: boolean;
    setShowCreateReviewModal: React.Dispatch<React.SetStateAction<boolean>>
    movie: IMovie | null;
    quantityReviews: number;
}

const HeaderReviewsMovieDetails = ({ checkUserReview, showCreateReviewModal, setShowCreateReviewModal, movie, quantityReviews }: HeaderReviewsMovieDetailsProps) => {
    return (
        <div className="flex flex-col gap-2 sm:gap-0 sm:flex-row justify-between items-center py-2 px-4 rounded-2xl dark:bg-neutral-900 bg-neutral-200 mt-2 sm:mt-4 dark:text-black">
            <Button
                className="dark:bg-neutral-800 dark:text-white text-sm sm:text-base dark:hover:bg-neutral-700"
                onClick={() => checkUserReview()}
            >
                Fazer uma avaliação
            </Button>

            <CreateOrEditReviewModal open={showCreateReviewModal} setOpen={setShowCreateReviewModal} movie={movie} variant="create" />

            <p className="text-sm sm:text-base dark:text-white">Avaliações concluídas | <span className="font-bold">
                {quantityReviews}
            </span></p>
        </div>
    )
}

export default HeaderReviewsMovieDetails