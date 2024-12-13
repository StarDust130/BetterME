import { Skeleton } from "@/components/ui/skeleton";

const StatsSkelton = () => {
  return (
    <>
      <div className="w-full px-3 md:px-10 mx-auto py-5 mb-10">
        <div className="flex justify-center items-center flex-col mb-3">
          {/* Page Title Skeleton */}
          <Skeleton className="w-48 h-8 text-center md:w-64 md:h-10 mb-4" />

          {/* Description Skeleton */}
          <Skeleton className="w-56 h-5 text-center  md:w-80 md:h-6 mb-6" />
        </div>

        {/* Filter and Controls Skeleton */}
        <div className="md:flex items-center justify-between py-4 gap-4">
          <Skeleton className="w-full md:w-[30rem]  h-10 mb-3 md:mb-0" />
          <div className="flex justify-between flex-row-reverse md:flex-row mt-3 md:mt-0 md:justify-end md:ml-auto w-full items-center gap-2">
            <Skeleton className="w-32 h-10" />
            <Skeleton className="w-40 h-10" />
          </div>
        </div>

        {/* Table Skeleton */}
        <div className="rounded-md border text-center mb-4">
          <Skeleton className="w-full h-10 mb-2" /> {/* Table Header */}
          <Skeleton className="w-full h-48" /> {/* Table Body */}
        </div>

        {/* Footer and Pagination Skeleton */}
        <div className="flex items-center justify-between">
          <Skeleton className="w-24 h-6" />
          <div className="flex justify-center items-center gap-4">
            <Skeleton className="w-20 h-6" />
            <Skeleton className="w-20 h-6" />
          </div>
        </div>
      </div>
    </>
  );
};
export default StatsSkelton;
