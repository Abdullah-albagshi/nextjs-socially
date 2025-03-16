import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileLoading() {
	return (
		<div className="w-full max-w-3xl mx-auto flex flex-col ">
			<div className="border rounded-lg p-6 bg-background max-w-lg self-center w-full">
				{/* Profile header with avatar */}
				<div className="flex flex-col items-center">
					<Skeleton className="h-24 w-24 rounded-full mb-4" />
					<Skeleton className="h-8 w-64 mb-1" /> {/* Name */}
					<Skeleton className="h-5 w-40 mb-3" /> {/* Username */}
					<Skeleton className="h-5 w-24 mb-6" /> {/* Bio/occupation */}
					
					{/* Stats */}
					<div className="flex justify-center gap-12 w-full mb-6">
						<div className="flex flex-col items-center">
							<Skeleton className="h-6 w-6 mb-1" /> {/* Number */}
							<Skeleton className="h-4 w-20" /> {/* Label */}
						</div>
						<div className="flex flex-col items-center">
							<Skeleton className="h-6 w-6 mb-1" /> {/* Number */}
							<Skeleton className="h-4 w-20" /> {/* Label */}
						</div>
						<div className="flex flex-col items-center">
							<Skeleton className="h-6 w-6 mb-1" /> {/* Number */}
							<Skeleton className="h-4 w-20" /> {/* Label */}
						</div>
					</div>
					
					{/* Edit profile button */}
					<Skeleton className="h-10 w-full max-w-sm mb-6" />
					
					{/* Profile details */}
					<div className="w-full space-y-4 mb-6">
						<div className="flex items-center gap-2">
							<Skeleton className="h-5 w-5" /> {/* Icon */}
							<Skeleton className="h-5 w-32" /> {/* Location */}
						</div>
						<div className="flex items-center gap-2">
							<Skeleton className="h-5 w-5" /> {/* Icon */}
							<Skeleton className="h-5 w-64" /> {/* Website */}
						</div>
						<div className="flex items-center gap-2">
							<Skeleton className="h-5 w-5" /> {/* Icon */}
							<Skeleton className="h-5 w-48" /> {/* Join date */}
						</div>
					</div>
				</div>
			</div>
			
			{/* Tabs */}
			<div className="flex border-b mt-6 mb-4 w-[300px]">
				<div className="flex-1 flex justify-center pb-2 border-b-2 border-primary">
					<Skeleton className="h-5 w-16" /> {/* Posts tab */}
				</div>
				<div className="flex-1 flex justify-center pb-2">
					<Skeleton className="h-5 w-16" /> {/* Likes tab */}
				</div>
			</div>
			
			{/* Post skeleton */}
			<div className="border rounded-lg p-4 mb-4 bg-background">
				<div className="flex items-start gap-3">
					<Skeleton className="h-10 w-10 rounded-full" /> {/* Avatar */}
					<div className="flex-1">
						<div className="flex items-center gap-2 mb-1">
							<Skeleton className="h-5 w-32" /> {/* Name */}
							<Skeleton className="h-4 w-24" /> {/* Username */}
							<Skeleton className="h-4 w-16 ml-auto" /> {/* Date */}
						</div>
						<Skeleton className="h-4 w-full mb-4" /> {/* Post content */}
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
			
			{/* Another post skeleton */}
			<div className="border rounded-lg p-4 bg-background">
				<div className="flex items-start gap-3">
					<Skeleton className="h-10 w-10 rounded-full" /> {/* Avatar */}
					<div className="flex-1">
						<div className="flex items-center gap-2 mb-1">
							<Skeleton className="h-5 w-32" /> {/* Name */}
							<Skeleton className="h-4 w-24" /> {/* Username */}
							<Skeleton className="h-4 w-16 ml-auto" /> {/* Date */}
						</div>
						<Skeleton className="h-4 w-full mb-4" /> {/* Post content */}
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
		</div>
	);
}
