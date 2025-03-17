import { isFollowing } from '@/actions/profile.action';
import { FollowButtonClient } from './FollowButton';

interface FollowButtonProps {
	userId: string;
}

const FollowButton = async ({ userId }: FollowButtonProps) => {
	const isFollowingUser = await isFollowing(userId);

	return <FollowButtonClient userId={userId} isFollowing={isFollowingUser} />
};

export default FollowButton;