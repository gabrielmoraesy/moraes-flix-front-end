'use client'

import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useAuth } from "@/contexts/AuthContext/authContext";
import { cn } from "@/utils/cn";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronsUpDown } from "lucide-react";
import { Check } from "phosphor-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import toast from 'react-hot-toast'
import { useNavigate } from "react-router-dom";
import { API_INSTANCE } from "@/services/api";

interface IMoviesGenres {
    value: string
    label: string
}

const movieGenres: IMoviesGenres[] = [
    { value: "Ação", label: "Ação" },
    { value: "Aventura", label: "Aventura" },
    { value: "Comédia", label: "Comédia" },
    { value: "Drama", label: "Drama" },
    { value: "Terror", label: "Terror" },
    { value: "Suspense", label: "Suspense" },
    { value: "Fantasia", label: "Fantasia" },
    { value: "Ficção Científica", label: "Ficção Científica" },
    { value: "Romance", label: "Romance" },
    { value: "Animação", label: "Animação" },
]

const currentYear = new Date().getFullYear();

const createMovieSchema = z.object({
    title: z.string()
        .nonempty("Título é obrigatório")
        .max(200, "Título não pode ter mais de 200 caracteres"),
    description: z.string()
        .nonempty("Descrição é obrigatória")
        .max(1000, "Descrição não pode ter mais de 1000 caracteres"),
    releaseYear: z.string()
        .transform((value) => parseInt(value, 10))
        .refine((value) => !isNaN(value) && value <= currentYear, {
            message: `Ano não pode ser maior que ${currentYear}`,
        }),
    duration: z.string()
        .transform((value) => parseInt(value, 10))
        .refine((value) => !isNaN(value) && value > 0 && value <= 999, {
            message: "Duração é obrigatória e deve estar entre 1 e 999 minutos",
        }),
});


type CreateMovieFormInputs = z.infer<typeof createMovieSchema>;

const CreateMovieForm = () => {
    const navigate = useNavigate()
    const { user } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm<CreateMovieFormInputs>({
        resolver: zodResolver(createMovieSchema),
    });
    const [open, setOpen] = useState(false);
    const [genreSelected, setGenreSelected] = useState("");
    const currentYear = new Date().getFullYear();

    const handleCreateMovie = async (data: CreateMovieFormInputs) => {
        if (!genreSelected) {
            toast.error("Selecione um gênero")
            return
        }

        try {
            await API_INSTANCE.post("/movies", {
                title: data.title,
                description: data.description,
                genre: genreSelected,
                releaseYear: Number(data.releaseYear),
                duration: Number(data.duration),
                userId: user!.id
            });

            toast.success("Filme criado com sucesso")
            navigate("/")
        } catch (error) {
            toast.error(`Erro ao criar filme: ${error}`);
        }
    };

    return (
        <form onSubmit={handleSubmit(handleCreateMovie)} className="flex flex-col items-center gap-4">
            <div className="flex flex-col gap-2 w-[100%]">
                <Input
                    type="text"
                    placeholder="Digite o nome do filme..."
                    className="p-2 border border-gray-300 rounded w-full"
                    {...register("title")}
                    max={200}
                />
                {errors.title && <span className="text-red-500">{errors.title.message}</span>}
            </div>


            <div className="flex flex-col gap-2 w-[100%]">
                <Input
                    type="text"
                    placeholder="Digite a descrição do filme..."
                    className="p-2 border border-gray-300 rounded w-full"
                    {...register("description")}
                    max={1000}
                />
                {errors.description && <span className="text-red-500">{errors.description.message}</span>}
            </div>

            <div className="flex gap-2 w-full">
                <div className="flex flex-col gap-2 w-[50%]">
                    <Input
                        type="number"
                        placeholder="Digite o ano de lançamento..."
                        className="p-2 border border-gray-300 rounded"
                        {...register("releaseYear")}
                        min={1500}
                        max={currentYear}
                    />
                    {errors.releaseYear && <span className="text-red-500">{errors.releaseYear.message}</span>}
                </div>

                <div className="flex flex-col gap-2 w-[50%]">
                    <Input
                        type="number"
                        placeholder="Digite a duração (min) do filme..."
                        className="p-2 border border-gray-300 rounded"
                        {...register("duration")}
                        max={1000}
                    />
                    {errors.duration && <span className="text-red-500">{errors.duration.message}</span>}
                </div>

            </div>

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                    >
                        {genreSelected
                            ? movieGenres.find((genre: IMoviesGenres) => genre.value === genreSelected)?.label
                            : "Selecionar Gênero..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                    <Command>
                        <CommandInput placeholder="Pesquise o gênero..." />
                        <CommandList>
                            <CommandEmpty>Sem resultados</CommandEmpty>
                            <CommandGroup>
                                {movieGenres.map((genre: IMoviesGenres) => (
                                    <CommandItem
                                        key={genre.value}
                                        value={genre.value}
                                        onSelect={(currentValue) => {
                                            const newValue = currentValue === genreSelected ? "" : currentValue;
                                            setGenreSelected(newValue);
                                            setOpen(false);
                                        }}
                                    >

                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                genreSelected === genre.value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {genre.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>

            <Button
                type="submit"
                className="w-full bg-primaryBlue p-2 rounded-lg text-white dark:hover:text-black duration-200"
            >
                Criar filme
            </Button>
        </form>
    )
}

export default CreateMovieForm;
