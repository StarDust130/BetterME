import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@radix-ui/react-select";

const HomeSkeleton = () => {
  return (
    <main className="flex flex-col items-center w-full p-4 min-h-screen">
      {/* Header Skeleton */}
      <Skeleton className="w-48 h-8 md:w-64 md:h-12 mb-6" />

      {/* Quote Block Skeleton */}
      <div className=" max-w-3xl w-full p-6 rounded-lg   shadow-xl">
        <Skeleton className="w-full h-8 mb-1" />
        <Skeleton className="w-full h-8 mb-4" />
        <div className="w-full justify-end flex">
          {" "}
          <Skeleton className="w-20 h-6 text-right" />{" "}
        </div>
      </div>

      {/* Tabs */}
      <div className="w-full justify-end flex my-2 mt-3  md:max-w-3xl mx-auto">
        <div className="flex justify-end items-center gap-1">
          <Skeleton className="w-20 h-6 text-right" />{" "}
          <Skeleton className="w-20 h-6 text-right" />{" "}
        </div>
      </div>

      {/* Mini Cards Skeleton */}
      <div className="w-full flex gap-3 mt-3 max-h-30 justify-center items-center">
        <Skeleton className="w-40 h-20  flex justify-center items-center  text-center rounded-lg" />
        <Skeleton className="w-40 h-20  flex justify-center items-center  text-center rounded-lg" />
        <Skeleton className="w-40 h-20  flex justify-center items-center  text-center rounded-lg" />
        <Skeleton className="w-40 h-20  flex justify-center items-center  text-center rounded-lg" />
      </div>

      {/* Show Today Activity */}
      <div className="w-full px-3 md:max-w-3xl py-3 mb-6 mx-auto">
        <div className="w-full flex flex-col gap-3">
          <Separator />

          {/* Today Todo Skeleton */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <Skeleton className="w-full  h-16 md:h-60" />
            <Skeleton className="w-full  h-16 md:h-60" />
          </div>

          {/* Today Activity Skeleton */}
          <div className="md:mt-3 rounded-xl w-full">
            <div className="flex w-full justify-center items-center  py-4 rounded-lg">
              <Skeleton className="w-40 h-6 text-center" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-6">
              <Skeleton className="w-full h-40 rounded-md " />
              <Skeleton className="w-full h-40 rounded-md " />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomeSkeleton;
