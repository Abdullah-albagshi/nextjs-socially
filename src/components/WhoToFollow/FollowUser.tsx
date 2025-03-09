'use client';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { toggleFollow } from '@/actions/user.action';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

function FollowUser({ userId }: { userId: string }) {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleFollow = async () => {
		setIsLoading(true);
		try {
			toggleFollow(userId);
			toast.success('User Followed Successfully');
			setIsLoading(false);
		} catch {
			toast.error('Error Following User');
			setIsLoading(false);
		}
	};

	return (
		<Button
			variant={'secondary'}
			className='w-20'
			onClick={handleFollow}
			disabled={isLoading}
		>
			{isLoading ? <Loader2 className='size-4 animate-spin' /> : 'Follow'}
		</Button>
	);
}

export default FollowUser;
