import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const ActivitySkeleton = () => {
  return (
    <>
      {" "}
      <main className="flex flex-col items-center w-full p-4 min-h-screen">
        {/* Show Today Activity */}
        <div className="w-full px-3 md:max-w-3xl py-3 mb-6 mx-auto">
          <div className="w-full flex flex-col gap-3">
            <Separator />

            {/* Today Todo Skeleton */}
            <div className="flex flex-col md:flex-row gap-8 justify-between items-center">
              <Skeleton className="w-full  h-10 md:h-80" />
              <Skeleton className="w-full  h-10 md:h-80" />
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
    </>
  );
};
export default ActivitySkeleton;
