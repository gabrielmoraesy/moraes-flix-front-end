import { API_INSTANCE } from "@/services/api";
import { useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const UseMovieDetails = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false)


    const getMovieById = async () => {
        try {
            setLoading(true)
            const response = await API_INSTANCE.get(`http://localhost:3333/movies/${id}`);

            return response.data
        } catch (error) {
            toast.error(`Erro ao buscar filmes: ${error}`);
        } finally {
            setLoading(false)
        }
    };

    return { getMovieById, loading }
}

export default UseMovieDetails