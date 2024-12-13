import { Skeleton } from "@/components/ui/skeleton";

const Page = () => {
  return (
    <div
      suppressHydrationWarning
      className="flex flex-col items-center w-full min-h-screen p-6"
    >
      {/* Page Header Skeleton */}
      <Skeleton className="w-48 h-8 mb-6" />
      <Skeleton className="w-72 h-6 mb-8" />

      {/* Cards Skeleton Container */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-3xl sm:max-w-5xl">
        {[...Array(6)].map((_, index) => (
          <Skeleton
            key={index}
            className="relative w-full h-48 rounded-2xl shadow-xl"
          />
        ))}
      </div>

      {/* Footer Skeleton */}
      <div className="my-8 md:mt-10 text-center">
        <Skeleton className="w-56 h-4" />
      </div>
    </div>
  );
};

export default Page;
