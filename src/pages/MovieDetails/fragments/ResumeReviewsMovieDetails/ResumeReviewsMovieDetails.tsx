import { Progress } from "@/components/ui/progress"
import { Star } from "phosphor-react"

interface ResumeReviewsMovieDetailsProps {
    formattedAverageReview: string;
    quantityReviews: number;
    starCounts: { [key: number]: number };
}

const ResumeReviewsMovieDetails = ({ formattedAverageReview, quantityReviews, starCounts }: ResumeReviewsMovieDetailsProps) => {
    return (
        <div className="mt-4 sm:w-[30%] flex flex-col gap-3">
            <h1 className="font-medium text-sm sm:text-base">Avaliação de clientes</h1>
            <div className="flex items-center justify-between pb-2 border-b-2 border-gray-200">
                <h1 className="flex gap-2 text-3xl">{formattedAverageReview}<Star color="yellow" size={32} fill="yellow" /></h1>
                <p>{quantityReviews} {quantityReviews === 1 ? "avaliação" : "avaliações"}</p>
            </div>

            <div className="flex flex-col justify-start gap-1 w-full">
                <h1>Classificação</h1>
                {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center gap-5">
                        <h1 className="flex gap-1 text-lg">
                            <p>{star}</p>
                            <Star color="yellow" size={25} fill="yellow" />
                        </h1>
                        <Progress value={quantityReviews! > 0 ? (starCounts[star] / quantityReviews!) * 100 : 0} className="h-[12px]" />
                        <p>{starCounts[star]}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ResumeReviewsMovieDetails