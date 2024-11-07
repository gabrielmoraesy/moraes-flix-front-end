import CreateOrEditMovieForm from "@/components/Form/CreateOrEditMovieForm/CreateOrEditMovieForm";

export const CreateMovie = () => {
    return (
        <div className="flex flex-col items-center dark:text-white">
            <div className="pt-8 max-w-5xl w-full text-center px-4">
                <h1 className="text-2xl font-bold">Criação do filme</h1>
                <p className="text-lg mb-5">
                    Crie seu filme agora mesmo e exiba ele para o público
                </p>

                <CreateOrEditMovieForm variant="create" />
            </div>
        </div>
    );
};
