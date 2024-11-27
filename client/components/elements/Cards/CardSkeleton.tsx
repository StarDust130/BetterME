import { Skeleton } from "@/components/ui/skeleton";

const CardSkeleton = () => {
  return (
    <div className="flex flex-col w-full justify-center items-center">
      {/* H1 Skeleton */}
      <div className="text-center mb-4  rounded-2xl">
        <Skeleton className="w-32 h-6 mx-auto z-10" /> 
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 w-full lg:grid-cols-2 gap-4 mt-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="w-full max-w-sm bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-lg shadow-md p-5"
          >
            {/* Header Section Skeleton */}
            <div className="flex justify-between items-start">
              {/* Icon Placeholder */}
              <Skeleton className="w-12 h-12 rounded-full" />

              {/* Title Placeholder */}
              <Skeleton className="w-1/2 h-6 mt-4" />
            </div>

            {/* Content Section Skeleton */}
            <div className="mt-3 space-y-2">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-3/4 h-4" />
            </div>

            {/* Footer Section Skeleton */}
            <div className="mt-5 flex justify-end">
              <Skeleton className="w-24 h-8 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardSkeleton;
