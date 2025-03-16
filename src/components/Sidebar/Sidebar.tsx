import {
	SignedIn,
	SignedOut,
	SignInButton,
	SignUpButton,
} from '@clerk/nextjs';

import React from 'react';
import { Button } from '../ui/button';
import { getUserById } from '@/actions/user.action';
import { currentUser } from '@clerk/nextjs/server';
import { Card, CardContent } from '../ui/card';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { LinkIcon, MapPin } from 'lucide-react';

async function Sidebar() {
	const clerkUser = await currentUser();
	if (!clerkUser) return <LoggedOutUser />;
	const user = await getUserById(clerkUser?.id);
	if (!user) return null;
	return (
		<div className='sticky top-20'>
			<SignedIn>
				<Card>
					<CardContent className='pt-6'>
						<div className='flex flex-col items-center text-center'>
							<Link
								href={`/${user.username}`}
								className='flex flex-col items-center justify-center'
							>
								<Avatar className='w-20 h-20 border-2'>
									<AvatarImage src={user.image as string} />
									<AvatarFallback>{user?.username}</AvatarFallback>
								</Avatar>
								<div className='mt-4 space-y-1'>
									<h3 className='font-semibold'>{user.name}</h3>
									<p className='text-sm text-muted-foreground'>
										{user.username}
									</p>
								</div>
							</Link>
							{user.bio && (
								<p className='text-sm text-muted-foreground mt-4'>{user.bio}</p>
							)}
							<Separator className='my-4' />

							<div className='flex flex-row justify-between flex-1 w-full'>
								<div>
									<p className='text-sm text-primary'>
										{user._count.following}
									</p>
									<p className='text-sm text-muted-foreground'>Following</p>
								</div>
								<Separator orientation='vertical' />
								<div>
									<p className='text-sm text-primary'>
										{user._count.followers}
									</p>
									<p className='text-sm text-muted-foreground'>Followers</p>
								</div>
							</div>

							<Separator className='my-4' />
							<div className='flex items-center justify-start gap-2 self-start w-full'>
								<MapPin width={16} className='text-muted-foreground' />
								<p className='text-sm text-muted-foreground'>
									{user.location ?? 'No Location'}
								</p>
							</div>

							<div className='flex items-center justify-start gap-2 self-start w-full'>
								<LinkIcon width={16} className='text-muted-foreground' />
								{user.website ? (
									<Link
										href={user.website}
										target='_blank'
										className='hover:underline truncate text-muted-foreground text-sm'
									>
										{user.website}
									</Link>
								) : (
									<p className='text-sm text-muted-foreground'>No website</p>
								)}
							</div>
						</div>
					</CardContent>
				</Card>
			</SignedIn>
		</div>
	);
}

export default Sidebar;

const LoggedOutUser = () => {
	return (
		<div className=' sticky top-20'>
			<SignedOut>
				<div className='flex flex-col gap-4 border rounded-sm p-8'>
					<h2 className='text-lg text-center'>Welcome Back!</h2>
					<p className='text-center text-gray-500 mt-2'>
						Login to access your profile and connect with others.
					</p>
					<SignInButton mode='modal'>
						<Button className='mt-2' variant='outline'>
							Sign In
						</Button>
					</SignInButton>
					<SignUpButton mode='modal'>
						<Button variant='default'>Sign Up</Button>
					</SignUpButton>
				</div>
			</SignedOut>
		</div>
	);
};
