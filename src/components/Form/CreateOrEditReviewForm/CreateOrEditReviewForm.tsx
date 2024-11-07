import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext/authContext";
import { IMovie } from "@/interfaces/IMovie";
import { api } from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Star } from "phosphor-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const createReviewSchema = z.object({
    rating: z.string().nonempty("Nota é obrigatória"),
    comment: z.string().optional(),
});

type CreateReviewFormInputs = z.infer<typeof createReviewSchema>;

interface StarRatingProps {
    onSelectRating: (rating: number) => void;
    selectedRating: number | null;
}

interface CreateReviewFormProps {
    movie: IMovie;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    variant: "create" | "edit";
}

const StarRating = ({ onSelectRating, selectedRating }: StarRatingProps) => {
    const stars = Array.from({ length: 5 }, (_, index) => index + 1);

    return (
        <div className="flex gap-1">
            {stars.map((star) => (
                <div
                    key={star}
                    onClick={() => onSelectRating(star)}
                    className="cursor-pointer"
                >
                    <Star
                        size={32}
                        weight={star <= selectedRating! ? "fill" : "regular"}
                        className={star <= selectedRating! ? 'text-yellow-500' : 'text-gray-300'}
                    />
                </div>
            ))}
        </div>
    );
};

const CreateOrEditReviewForm = ({ movie, setOpen, variant }: CreateReviewFormProps) => {
    const { user } = useAuth();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<CreateReviewFormInputs>({
        resolver: zodResolver(createReviewSchema),
    });

    const [selectedRating, setSelectedRating] = useState<number | null>(null);

    const handleRatingSelect = (rating: number) => {
        setSelectedRating(rating);
        setValue("rating", rating.toString());
    };

    const handleCreateReview = async (data: CreateReviewFormInputs) => {
        try {
            await api.post(`/reviews/${user!.id}/${movie.id}`, {
                rating: Number(data.rating),
                comment: data.comment || ""
            });

            toast.success("Avaliação criada com sucesso");
        } catch (error) {
            toast.error(`Ocorreu um erro ao criar avaliação: ${error}`);
        } finally {
            setOpen(false);
        }
    };

    const reviewUser = movie.reviews.find(review => review.userId === user?.id)

    const handleEditReview = async (data: CreateReviewFormInputs) => {
        try {
            await api.patch(`/reviews/${reviewUser?.id}`, {
                rating: Number(data.rating),
                comment: data.comment || ""
            });

            toast.success("Avaliação editada com sucesso");
        } catch (error) {
            toast.error(`Ocorreu um erro ao editar sua avaliação: ${error}`);
        } finally {
            setOpen(false);
        }
    };

    useEffect(() => {
        if (variant === 'edit' && reviewUser) {
            setSelectedRating(reviewUser.rating || 0);
            setValue("rating", reviewUser.rating?.toString() || "");
            setValue("comment", reviewUser.comment);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <form onSubmit={handleSubmit(variant === "create" ? handleCreateReview : handleEditReview)} className="flex flex-col items-center gap-4">
            <StarRating onSelectRating={handleRatingSelect} selectedRating={selectedRating} />
            {errors.rating && <span className="text-red-500">{errors.rating.message === "Required" ? "Nota é obrigatória" : errors.rating.message}</span>}

            <textarea
                placeholder="Digite seu comentário..."
                className="p-2 border border-gray-300 rounded w-full dark:text-black min-h-[100px] max-h-[300px]"
                {...register("comment")}
                maxLength={500}
            />
            {errors.comment && <span className="text-red-500">{errors.comment.message}</span>}

            <Button
                type="submit"
                className="w-full bg-primaryBlue p-2 rounded-lg text-white dark:hover:text-black"
            >
                Avaliar
            </Button>
        </form>
    );
}

export default CreateOrEditReviewForm;
