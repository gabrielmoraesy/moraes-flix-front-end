import useDashboard from "./Dashboard.hook";
import MyMoviesDashboard from "./fragments/MyMoviesDashboard/MyMoviesDashboard";
import MyReviewsDashboard from "./fragments/MyReviewsDashboard/MyReviewsDashboard";
import SkeletonDashboard from "./fragments/SkeletonDashboard/SkeletonDashboard";

export const Dashboard = () => {
  const {
    handleDeleteMovie,
    handleDeleteReview,
    loading,
    myMovies,
    myReviews,
    renderButtonsTable,
    myMoviesIsOpen,
    myReviewsIsOpen,
    showDeleteMovieModal,
    setShowDeleteMovieModal,
    showDeleteReviewModal,
    setShowDeleteReviewModal
  } = useDashboard()

  return (
    <div className="pt-4 sm:pt-8 min-h-screen max-w-7xl mx-auto text-center pb-10">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <h3 className="text-lg font-normal">Gerencie todos os seus projetos</h3>
      <div className="flex justify-between font-bold border-b-2 border-gray-300 w-4/5 mx-auto py-2">
        <span className="text-lg">Título</span>
        <span className="text-lg">Ações</span>
      </div>

      <div className="flex justify-center items-center gap-2 mt-4 text-lg">
        Seus filmes
        {renderButtonsTable("myMovies")}
      </div>

      {!loading &&
        <MyMoviesDashboard
          myMovies={myMovies}
          myMoviesIsOpen={myMoviesIsOpen}
          showDeleteMovieModal={showDeleteMovieModal}
          setShowDeleteMovieModal={setShowDeleteMovieModal}
          handleDeleteMovie={handleDeleteMovie}
        />
      }

      {loading && <SkeletonDashboard />}

      <div className="flex justify-center items-center gap-2 mt-6 text-lg">
        Suas avaliações
        {renderButtonsTable("myReviews")}
      </div>

      {!loading &&
        <MyReviewsDashboard
          myReviews={myReviews}
          myReviewsIsOpen={myReviewsIsOpen}
          showDeleteReviewModal={showDeleteReviewModal}
          setShowDeleteReviewModal={setShowDeleteReviewModal}
          handleDeleteReview={handleDeleteReview}
        />
      }

      {loading && <SkeletonDashboard />}
    </div>
  );
};
