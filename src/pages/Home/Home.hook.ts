import { useAuth } from "@/contexts/AuthContext/authContext";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const UseHome = () => {
    const { token } = useAuth()
    const [loading, setLoading] = useState(false)

    const getAllMovies = async () => {
        try {
            setLoading(true)
            const response = await axios.get("http://localhost:3333/movies", {
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

    return { getAllMovies, loading }
}

export default UseHome