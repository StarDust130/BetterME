import { Skeleton } from "@/components/ui/skeleton";

const UserGitHubCardSkeleton: React.FC = () => {
  return (
    <div className="max-w-screen-lg mx-auto p-6 space-y-6 rounded-lg shadow-lg">
      {/* User Info Header Skeleton */}
      <div className="flex flex-col sm:flex-row items-center gap-6 p-6 border rounded-lg">
        <Skeleton className="w-32 h-32 rounded-full" />
        <div className="flex flex-col gap-2">
          <Skeleton className="w-40 h-6" />
          <Skeleton className="w-60 h-4" />
        </div>
      </div>

      {/* Activity Graph Skeleton */}
      <Skeleton className="w-full h-40 border rounded-lg" />

      {/* Main Data Section Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, index) => (
          <div key={index} className="p-4 bg-white border rounded-lg shadow-md">
            <Skeleton className="w-12 h-12 mb-4 rounded-full" />
            <Skeleton className="w-32 h-6" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserGitHubCardSkeleton;
