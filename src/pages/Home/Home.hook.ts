import { API_INSTANCE } from "@/services/api";
import { useState } from "react";
import toast from "react-hot-toast";

const UseHome = () => {
    const [loading, setLoading] = useState(false);

    const getAllMovies = async () => {
        try {
            setLoading(true);
            const response = await API_INSTANCE.get("/movies");
            return response.data;
        } catch (error) {
            toast.error(`Erro ao buscar filmes: ${error}`);
            return [];
        } finally {
            setLoading(false);
        }
    };

    return { getAllMovies, loading };
}

export default UseHome;
