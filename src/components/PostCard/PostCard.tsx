'use client';

import {
	createComment,
	deletePost,
	getPosts,
	toggleLike,
} from '@/actions/posts.action';
import { Card, CardContent } from '../ui/card';
import { useUser } from '@clerk/nextjs';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

type Post = NonNullable<Awaited<ReturnType<typeof getPosts>>>[number];

interface PostCardProps {
	post: Post;
	dbUserId: string | null;
}

const PostCard = ({ post, dbUserId }: PostCardProps) => {
	const { user } = useUser();

	const [newComment, setNewComment] = useState('');
	const [isCommenting, setIsCommenting] = useState(false);
	const [isLiking, setIsLiking] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const [hasLiked, setHasLiked] = useState(
		post.likes.some((like) => like.userId === dbUserId)
	);
	const [optimisticLikes, setOptimisticLikes] = useState(post._count.likes);

	const handleLike = async () => {
		if (isLiking) return;
		try {
			setIsLiking(true);
			setHasLiked((prev) => !prev);
			setOptimisticLikes((prev) => prev + (hasLiked ? -1 : 1));
			await toggleLike(post.id);
		} catch (error) {
			setOptimisticLikes(post._count.likes);
			setHasLiked(post.likes.some((like) => like.userId === dbUserId));
		} finally {
			setIsLiking(false);
		}
	};

	const handleAddComment = async () => {
		if (!newComment.trim() || isCommenting) return;
		try {
			setIsCommenting(true);
			const res = await createComment(post.id, newComment);
			if (res?.success) {
				toast.success('Comment Posted successfully!');
				setNewComment('');
			}
		} catch (error) {
			toast.error('Failed to add comment');
		} finally {
			setIsCommenting(false);
		}
	};

	const handleDeletePost = async () => {
		if (post.authorId !== user?.id || isDeleting) return;
		try {
			setIsDeleting(true);
			const res = await deletePost(post.id);
			if (res?.success) {
				toast.success('Post Deleted Successfully!');
			} else {
				throw new Error(res?.error);
			}
		} catch (error) {
			toast.error('Failed to deletePost');
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<Card className='overflow-hidden'>
			<CardContent className='p-4 sm:p-6'>
				<div className='py-4'>
					<div className='flex gap-3 sm:gap-4'>
						<Link href={`/profile/${post.author.username}`}>
							<Avatar className='w-10 h-10 border-2'>
								<AvatarImage src={post.author.image as string} />
								<AvatarFallback>{post.author?.username}</AvatarFallback>
							</Avatar>
						</Link>
					</div>
				</div>
			</CardContent>
			<div>{post.content}</div>
		</Card>
	);
};

export default PostCard;
