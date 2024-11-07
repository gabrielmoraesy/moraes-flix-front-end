import CreateOrEditMovieForm from "@/components/Form/CreateOrEditMovieForm/CreateOrEditMovieForm";
import { Button } from "@/components/ui/button";
import { ArrowBendUpLeft } from "phosphor-react";
import { useNavigate } from "react-router-dom";

export const EditMovie = () => {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col items-center dark:text-white">
            <div className="pt-4 max-w-5xl w-full text-center px-4">
                <Button onClick={() => navigate(-1)} className='dark:bg-neutral-800 mb-3 justify-start'>
                    <ArrowBendUpLeft size={32} className='dark:text-white' />
                </Button >

                <h1 className="text-2xl font-bold">Edição do filme</h1>
                <p className="text-lg mb-5">
                    Edite seu filme agora mesmo e exiba ele para o público
                </p>

                <CreateOrEditMovieForm variant="edit" />
            </div>
        </div>
    );
};
