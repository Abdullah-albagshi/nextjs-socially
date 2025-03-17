import { Skeleton } from "@/components/ui/skeleton";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FollowersLoading() {
	return (
		<div className="w-full mx-auto flex flex-col">
			<div className="border rounded-lg bg-background self-center w-full">
				<CardHeader>
					<CardTitle>
            <Skeleton className="h-8 w-64 mb-1" />
					</CardTitle>
				</CardHeader>
        {
          [1,2,3].map((_, index) => (
				<CardContent key={index}>
					<div className="flex flex-col gap-4"> 
						<div className="f`lex items-center justify-between">
							<div className="flex items-center gap-3">
								<Skeleton className="h-12 w-12 rounded-full" />
								<div className="flex flex-col">
									<Skeleton className="h-5 w-32 mb-1" />
									<Skeleton className="h-4 w-24" />
								</div>
							</div>
							<Skeleton className="h-9 w-24 rounded-md" />
						</div>
					</div>
				</CardContent>
				))}
			</div>
		</div>
	);
}
