import { Button } from "@/components/ui/button"
import { IMovie } from "@/interfaces/IMovie"
import { ArrowBendUpLeft } from "phosphor-react"
import { useNavigate } from "react-router-dom"
import { Fragment } from "react/jsx-runtime"

interface InformartionMovieDetailsProps {
    movie: IMovie | null
    loading: boolean
}

const InformartionMovieDetails = ({ movie }: InformartionMovieDetailsProps) => {
    const navigate = useNavigate();

    return (
        <Fragment>
            <div className="flex justify-between items-center border-b-2 border-gray-300 pb-1">
                <h1 className="text-lg sm:text-2xl font-bold">{movie?.title}</h1>
                <Button onClick={() => navigate(-1)} className='dark:bg-neutral-800'>
                    <ArrowBendUpLeft size={32} className='dark:text-white' />
                </Button >
            </div>
            <div className="flex flex-col items-center mt-2 gap-2.5 sm:gap-2">
                <h3>
                    Filme cadastrado por: {movie?.user?.name} | {movie?.user?.email}
                </h3>
                <p>{movie?.releaseYear} | {movie?.duration}min | {movie?.genre}</p>
                <p><span className='font-bold'>Sinopse:</span> {movie?.description}</p>
            </div>
        </Fragment >
    )
}

export default InformartionMovieDetails