'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toggleFollow } from '@/actions/user.action';
import toast from 'react-hot-toast';
import clsx from 'clsx';

interface FollowButtonProps {
	userId: string;
	isFollowing: boolean;
}

export const FollowButtonClient = ({
	userId,
	isFollowing,
}: FollowButtonProps) => {
	const [isFollowingUser, setIsFollowingUser] = useState(isFollowing);
	const [isUpdatingFollow, setIsUpdatingFollow] = useState(false);
	const [isHovering, setIsHovering] = useState(false);
	const handleFollow = async () => {
		if (isUpdatingFollow) return;
		try {
			setIsUpdatingFollow(true);
			await toggleFollow(userId);
			setIsUpdatingFollow(false);
			setIsFollowingUser(!isFollowingUser);
		} catch (error) {
			toast.error('Error following user');
			console.error('Error following user:', error);
			setIsUpdatingFollow(false);
		}
	};

	return (
		<Button
			onClick={handleFollow}
			disabled={isUpdatingFollow}
			className={clsx(
				'w-20',
				isFollowingUser && 'hover:bg-red-500 hover:text-white',
			)}
      variant={isFollowingUser ? 'secondary' : 'default'}
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
		>
			{isUpdatingFollow
				? 'Following...'
				: !isFollowingUser
				? 'Follow'
				: isHovering
				? 'Unfollow'
				: 'Following'}
		</Button>
	);
};
