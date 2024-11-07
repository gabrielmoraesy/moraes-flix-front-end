import { Skeleton } from "@/components/ui/skeleton"
import { Fragment } from "react/jsx-runtime"

const SkeletonInformationMovieDetails = () => {
    return (
        <Fragment>
            <div className="flex justify-between items-center border-b-2 border-gray-300 pb-1">
                <Skeleton className="w-[40%] h-[32px]" />
                <Skeleton className="w-[48px] h-[40px]" />
            </div>
            <div className="flex flex-col items-center mt-2 gap-2.5 sm:gap-2">
                <Skeleton className="w-[50%] h-[24px]" />
                <Skeleton className="w-[30%] h-[24px]" />
                <Skeleton className="w-full h-[150px]" />
            </div>
        </Fragment>

    )
}

export default SkeletonInformationMovieDetails