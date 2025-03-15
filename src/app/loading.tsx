import { Skeleton } from "@/components/ui/skeleton";

export default function HomeLoading() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
      {/* Main content column */}
      <div className="col-span-6">
        {/* Create post card */}
        <div className="border rounded-lg p-4 bg-background mb-6">
          <div className="flex items-start gap-3">
            <Skeleton className="h-10 w-10 rounded-full" /> {/* User avatar */}
            <div className="flex-1">
              <Skeleton className="h-10 w-full rounded-lg" /> {/* What's on your mind input */}
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <Skeleton className="h-8 w-24" /> {/* Photo button */}
            <Skeleton className="h-8 w-24" /> {/* Post button */}
          </div>
        </div>

        {/* Posts */}
        <div className="flex flex-col gap-6">
          {[1, 2, 3, 4, 5, 6].map((_, index) => (
            <div key={index} className="border rounded-lg p-4 bg-background">
              <div className="flex items-start gap-3">
                <Skeleton className="h-10 w-10 rounded-full" /> {/* User avatar */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Skeleton className="h-5 w-32" /> {/* Username */}
                    <Skeleton className="h-4 w-24" /> {/* Handle */}
                    <Skeleton className="h-4 w-24 ml-auto" /> {/* Time */}
                  </div>
                  <Skeleton className="h-4 w-full mb-1" /> {/* Post content line 1 */}
                  <Skeleton className="h-4 w-3/4 mb-4" /> {/* Post content line 2 */}
                  
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-1">
                      <Skeleton className="h-5 w-5" /> {/* Like icon */}
                      <Skeleton className="h-4 w-4" /> {/* Like count */}
                    </div>
                    <div className="flex items-center gap-1">
                      <Skeleton className="h-5 w-5" /> {/* Comment icon */}
                      <Skeleton className="h-4 w-4" /> {/* Comment count */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar column - Who to follow */}
      <div className="hidden lg:block lg:col-span-4 sticky top-20">
        <div className="border rounded-lg p-4 bg-background">
          <Skeleton className="h-6 w-32 mb-4" /> {/* Who to follow heading */}
          
          {/* Suggested users to follow */}
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="flex items-center justify-between mb-4 last:mb-0">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" /> {/* User avatar */}
                <div>
                  <Skeleton className="h-5 w-24 mb-1" /> {/* Username */}
                  <Skeleton className="h-4 w-32" /> {/* Followers count */}
                </div>
              </div>
              <Skeleton className="h-9 w-20 rounded-md" /> {/* Follow button */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 