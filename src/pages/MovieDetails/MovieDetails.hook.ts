import { useAuth } from "@/contexts/AuthContext/authContext";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const UseMovieDetails = () => {
    const { token } = useAuth()
    const { id } = useParams();
    const [loading, setLoading] = useState(false)


    const getMovieById = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`http://localhost:3333/movies/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

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