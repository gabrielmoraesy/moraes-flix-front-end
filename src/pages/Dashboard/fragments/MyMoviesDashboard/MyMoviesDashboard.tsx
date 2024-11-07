import { ConfirmModal } from '@/components/Modals/ConfirmModal';
import { Button } from '@/components/ui/button';
import { IMovie } from '@/interfaces/IMovie'
import { Fragment } from 'react'
import { Link } from 'react-router-dom';

interface MyMoviesDashboardProps {
    myMovies: IMovie[] | undefined
    myMoviesIsOpen: boolean
    showDeleteMovieModal: boolean
    setShowDeleteMovieModal: React.Dispatch<React.SetStateAction<boolean>>
    handleDeleteMovie: (movieId: string) => void
}

const MyMoviesDashboard = (
    {
        myMovies,
        myMoviesIsOpen,
        showDeleteMovieModal,
        setShowDeleteMovieModal,
        handleDeleteMovie
    }: MyMoviesDashboardProps
) => {
    return (
        <Fragment>
            {myMovies && myMovies.map((movie: IMovie) => (
                <Fragment>
                    <div className={`flex flex-col sm:flex-row justify-between items-center border-b border-gray-200 w-4/5 mx-auto py-2 ${myMoviesIsOpen ? "flex" : "hidden"}`} key={movie.id}>
                        <p className="text-lg">{movie.title}</p>
                        <div className="flex gap-2">
                            <Link
                                to={`/movies/${movie.id}`}
                                className="border-2 border-gray-300 rounded-md px-4 py-2 hover:bg-gray-300 dark:hover:text-black duration-200"
                            >
                                Ver
                            </Link>
                            <Link
                                to={`/movies/edit/${movie.id}`}
                                className="border-2 border-gray-300 rounded-md px-4 py-2 hover:bg-gray-300 dark:hover:text-black duration-200"
                            >
                                Editar
                            </Link>
                            <Button
                                onClick={() => setShowDeleteMovieModal(true)}
                                className="bg-red-500 text-white border-2 border-red-500 rounded-md px-4 py-2 hover:bg-red-600 hover:border-red-600 duration-200"
                            >
                                Excluir
                            </Button>
                        </div>
                    </div>

                    {showDeleteMovieModal && (
                        <ConfirmModal
                            open={showDeleteMovieModal}
                            setOpen={setShowDeleteMovieModal}
                            onConfirm={() => handleDeleteMovie(movie.id)}
                            onCancel={() => setShowDeleteMovieModal((prevState) => !prevState)}
                            title={"Excluir filme"}
                            descripion={"Tem certeza que deseja excluir este filme?"}
                        />
                    )}
                </Fragment>
            ))}

            {myMovies && myMovies.length === 0 && (
                <div className={`mt-4 flex flex-col gap-2 items-center bg-gray-200 dark:bg-neutral-900 rounded-lg p-4 w-4/5 mx-auto ${myMoviesIsOpen ? "flex" : "hidden"}`}>
                    <p className="text-sm sm:text-lg">Você não possui nenhum filme criado</p>
                    <Link to="/movies/create" className="bg-primaryBlue text-white text-center cursor-pointer rounded-[10px] font-bold border-0 py-[10px] px-[15px] text-sm sm:text-base ml-4">
                        Criar filme
                    </Link>
                </div>
            )}
        </Fragment>
    )
}

export default MyMoviesDashboard