import {
	getProfileByUsername,
	getUserFollowers,
} from '@/actions/profile.action';
import { notFound } from 'next/navigation';
import { getDBUserId } from '@/actions/user.action';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import FollowButtonServer from '@/components/FollowButton/FollowButtonServer';


export async function generateMetadata({
	params,
}: {
	params: { username: string };
}) {
	const user = await getProfileByUsername(params.username);
	if (!user) return;

	return {
		title: `${user.name ?? user.username} followers`,
		description: `${user.username}'s followers.`,
	};
}


async function ProfilePageServer({ params }: { params: { username: string } }) {
	const user = await getProfileByUsername(params.username);
	const followers = await getUserFollowers(params.username);
	const dbUserId = await getDBUserId();
	const isSignedInUser = user?.id === dbUserId;
	if (!user) notFound();

	return (
		<Card>
			<CardHeader>
				<CardTitle>
					{isSignedInUser ? 'You' : user.name} have {followers.length}{' '}
					{followers.length === 1 ? 'Follower' : 'Followers'}
				</CardTitle>
			</CardHeader>
			<CardContent>
				{followers.length === 0 ? (
					<div className='p-4 text-muted-foreground text-center'>
						You don't have any followers
					</div>
				) : (
					<div>
						{followers.map(({ follower }, index) => (
							<div
								key={follower.id}
								className={`flex items-center justify-between gap-4 p-2 rounded hover:bg-muted/20 transition-colors border-b ${
									index === followers.length - 1 ? 'border-b-0' : ''
								}`}
							>
								<Link href={`/${follower.username}`} className='flex gap-4 items-center'>
									<Avatar className='mt-1'>
										<AvatarImage src={follower.image ?? '/avatar.png'} />
									</Avatar>
									<div className='flex flex-col'>
										<p className='text-semibold'>{follower.name}</p>
										<p className='text-muted-foreground text-sm'>
											@{follower.username}
										</p>
										<p className='text-white text-base mt-1'>{follower.bio}</p>
									</div>
								</Link>
								{dbUserId !== follower.id && (
									<FollowButtonServer userId={follower.id} />
								)}
							</div>
						))}
					</div>
				)}
			</CardContent>
		</Card>
	);
}
export default ProfilePageServer;
