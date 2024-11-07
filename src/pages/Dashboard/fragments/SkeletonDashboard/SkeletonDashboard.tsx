import { Skeleton } from "@/components/ui/skeleton"

const SkeletonDashboard = () => {
    return (
        <div className="mt-4 flex flex-col gap-2">
            {Array.from({ length: 2 }).map((_, index) => (
                <Skeleton key={index} className="w-4/5 mx-auto py-2 h-[55px]" />
            ))}
        </div>

    )
}

export default SkeletonDashboard