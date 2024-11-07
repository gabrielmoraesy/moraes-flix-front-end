import {
  ArrowsInLineVertical,
  ArrowsOutLineVertical
} from "phosphor-react";
import UseMovieDetails from "./MovieDetails.hook";
import HeaderReviewsMovieDetails from './fragments/HeaderReviewsMovieDetails/HeaderReviewsMovieDetails';
import InformartionMovieDetails from './fragments/InformartionMovieDetails/InformartionMovieDetails';
import ResumeReviewsMovieDetails from './fragments/ResumeReviewsMovieDetails/ResumeReviewsMovieDetails';
import ReviewsMovieDetails from './fragments/ReviewsMovieDetails/ReviewsMovieDetails';

export const MovieDetails = () => {
  const
    {
      movie,
      loading,
      handleDeleteReview,
      quantityReviews,
      formattedAverageReview,
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
    } = UseMovieDetails();

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto p-4 sm:p-8">
        <InformartionMovieDetails movie={movie} />

        {loading && <p className="text-lg my-1 mx-2">Carregando...</p>}

        <div className="flex justify-between items-center mt-4 sm:mt-8">
          <h1 className="text-lg sm:text-xl font-bold">Avaliações do filme</h1>
          {myReviewsIsOpen ? (
            <ArrowsInLineVertical size={32} onClick={() => setMyReviewsIsOpen(false)} />
          ) : (
            <ArrowsOutLineVertical size={32} onClick={() => setMyReviewsIsOpen(true)} />
          )}
        </div>

        <HeaderReviewsMovieDetails
          checkUserReview={checkUserReview}
          showCreateReviewModal={showCreateReviewModal}
          setShowCreateReviewModal={setShowCreateReviewModal}
          movie={movie}
          quantityReviews={quantityReviews}
        />

        <div className={`flex flex-col sm:flex-row gap-8 w-full ${myReviewsIsOpen ? "flex" : "hidden"}`}>
          <ResumeReviewsMovieDetails
            formattedAverageReview={formattedAverageReview}
            quantityReviews={quantityReviews}
            starCounts={starCounts}
          />

          <ReviewsMovieDetails
            movie={movie}
            showDeleteReviewModal={showDeleteReviewModal}
            setShowDeleteReviewModal={setShowDeleteReviewModal}
            showEditReviewModal={showEditReviewModal}
            setShowEditReviewModal={setShowEditReviewModal}
            handleDeleteReview={handleDeleteReview}
          />
        </div>
      </div>
    </div >
  );
};
