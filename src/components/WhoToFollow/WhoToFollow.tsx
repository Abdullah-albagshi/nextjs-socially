import { getRandomUsers } from '@/actions/user.action';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import FollowUser from './FollowUser';
import { Separator } from '../ui/separator';

async function WhoToFollow() {
	const users = await getRandomUsers();

	if (users.length === 0) return null;

	return (
		<Card>
			<CardHeader>
				<CardTitle>Who to follow</CardTitle>
			</CardHeader>
			<CardContent className='pt-2'>
				{users.map((user, idx) => (
					<>
						<div className='flex justify-between gap-4 my-2'>
							<Link
								href={`/${user.username}`}
								className='flex flex-row items-center justify-center gap-2'
							>
								<Avatar className='w-10 h-10 border-2'>
									<AvatarImage src={user.image as string} />
									<AvatarFallback>{user?.username}</AvatarFallback>
								</Avatar>
								<div>
									<h3 className='font-semibold text-sm'>{user.name}</h3>
									<p className='text-sm text-muted-foreground'>
										@{user.username}
									</p>
									<p className='text-sm text-muted-foreground'>
										{user._count.followers} Followers
									</p>
								</div>
							</Link>
							<FollowUser userId={user.id} />
						</div>
						{idx !== users.length -1  && <Separator className='my-4' />}
					</>
				))}
			</CardContent>
		</Card>
	);
}

export default WhoToFollow;
