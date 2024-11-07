import { Skeleton } from "@/components/ui/skeleton"

const SkeletonReviewMovieDetails = () => {
    return (
        <div className="mt-2 sm:mt-4 sm:w-[70%] flex flex-col gap-3">
            {Array.from({ length: 2 }).map((_, index) => (
                <Skeleton key={index} className="w-full p-4 border-b border-neutral-200 dark:border-none h-[140px]" />
            ))}
        </div>
    )

}

export default SkeletonReviewMovieDetails