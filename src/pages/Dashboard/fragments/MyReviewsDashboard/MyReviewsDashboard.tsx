import { ConfirmModal } from '@/components/Modals/ConfirmModal';
import { Button } from '@/components/ui/button';
import { IReview } from '@/interfaces/IReview';
import { renderStars } from '@/utils/stars';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

interface MyReviewsDashboardProps {
    myReviews: IReview[] | undefined
    myReviewsIsOpen: boolean
    showDeleteReviewModal: boolean
    setShowDeleteReviewModal: React.Dispatch<React.SetStateAction<boolean>>
    handleDeleteReview: (reviewId: string) => void
}

const MyReviewsDashboard = (
    {
        myReviews,
        myReviewsIsOpen,
        showDeleteReviewModal,
        setShowDeleteReviewModal,
        handleDeleteReview
    }: MyReviewsDashboardProps
) => {
    return (
        <Fragment>
            {myReviews && myReviews.map((review: IReview) => (
                <Fragment>
                    <div className={`pb-2 flex justify-between items-center border-b border-gray-200 w-4/5 mx-auto py-2 ${myReviewsIsOpen ? "flex" : "hidden"}`} key={review.id}>
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
                                to={`/movies/${review.movieId}`}
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
                <div className={`mt-4 flex flex-col gap-2 items-center bg-gray-200 dark:bg-neutral-900  rounded-lg p-4 w-4/5 mx-auto ${myReviewsIsOpen ? "flex" : "hidden"}`}>
                    <p className="text-sm sm:text-lg">Você não possui nenhuma avaliação</p>
                    <Link to="/" className="bg-primaryBlue text-white text-center cursor-pointer rounded-[10px] font-bold border-0 py-[10px] px-[15px] text-sm sm:text-base ml-4">
                        Avaliar um filme
                    </Link>
                </div>
            )}
        </Fragment>
    )
}

export default MyReviewsDashboard