'use client';

import {
	createComment,
	deletePost,
	getPosts,
	toggleLike,
} from '@/actions/posts.action';
import { Card, CardContent } from '../ui/card';
import { SignInButton, useUser } from '@clerk/nextjs';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import DeletePostDialog from './DeletePostDialog';
import { Button } from '../ui/button';
import { HeartIcon, Loader2, MessageCircleIcon, SendIcon } from 'lucide-react';
import clsx from 'clsx';
import { Textarea } from '../ui/textarea';

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
	const [showComments, setShowComments] = useState(false);

	const handleLike = async () => {
		if (isLiking) return;
		try {
			setIsLiking(true);
			setHasLiked((prev) => !prev);
			setOptimisticLikes((prev) => prev + (hasLiked ? -1 : 1));
			await toggleLike(post.id);
		} catch (error) {
      console.log(error)
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
      console.log(error)
			toast.error('Failed to add comment');
		} finally {
			setIsCommenting(false);
		}
	};

	const handleDeletePost = async () => {
		if (post.author.id !== dbUserId || isDeleting) return;
		try {
			setIsDeleting(true);
			const res = await deletePost(post.id);
			if (res?.success) {
				toast.success('Post Deleted Successfully!');
			} else {
				throw new Error(res?.error);
			}
		} catch (error) {
      console.log(error)
			toast.error('Failed to deletePost');
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<Card className='overflow-hidden'>
			<CardContent className='p-4 sm:p-6'>
				<div className='space-y-4'>
					<div className='flex gap-3 sm:gap-4'>
						<Link href={`/profile/${post.author.username}`}>
							<Avatar className='w-10 h-10 border-2'>
								<AvatarImage src={post.author.image as string} />
								<AvatarFallback>{post.author?.username}</AvatarFallback>
							</Avatar>
						</Link>
						<div className='flex-1 min-w-0'>
							<div className='flex items-start justify-between flex-1'>
								<div className='flex flex-col sm:flex-row sm:items-center sm:space-x-2 truncate flex-1 justify-between'>
									<div className='flex gap-2'>
										<Link
											href={`/profile/${post.author.username}`}
											className='font-semibold truncate'
										>
											{post.author.name}
										</Link>
										<div className='flex items-center space-x-2 text-sm text-muted-foreground'>
											<Link href={`/profile/${post.author.username}`}>
												@{post.author.username}
											</Link>
											<span>•</span>
											<span>
												{formatDistanceToNow(new Date(post.createdAt))} ago
											</span>
										</div>
									</div>
									{dbUserId === post.authorId && (
										<DeletePostDialog
											isDeleting={isDeleting}
											onDelete={handleDeletePost}
										/>
									)}
								</div>
							</div>
						</div>
					</div>
          <div className='flex flex-col'>
            <p className='mt-2 text-sm text-foreground break-words'>
              {post.content}
            </p>
            {/* Post Image */}
            {post.image && (
              <div className='rounded-lg overflow-hidden'>
                <img
                  src={post.image}
                  alt='Post Content'
                  className='w-full h-auto object-cover max-w-[400px] max-h-[400px]'
                />
              </div>
            )}
          </div>
					{/* Likes and Comments buttons */}
					<div className='flex items-center pt-2 space-x-4'>
						{user ? (
							<Button
								variant={'ghost'}
								size='sm'
								className={`text-muted-foreground gap-2 ${
									hasLiked
										? 'text-red-500 hover:text-red-600'
										: 'hover:text-red-500'
								}`}
								onClick={handleLike}
							>
								<HeartIcon
									className={clsx('size-5', hasLiked ? 'fill-current' : '')}
								/>
								<span>{optimisticLikes}</span>
							</Button>
						) : (
							<SignInButton mode='modal'>
								<Button
									variant='ghost'
									size='sm'
									className='text-muted-foreground gap-2'
								>
									<HeartIcon className='size-5' />
									<span>{optimisticLikes}</span>
								</Button>
							</SignInButton>
						)}

						<Button
							variant='ghost'
							size='sm'
							className='text-muted-foreground gap-2 hover:text-blue-500'
							onClick={() => setShowComments((prev) => !prev)}
						>
							<MessageCircleIcon
								className={clsx(
									'size-5',
									showComments ? 'fill-blue-500 text-blue-500' : ''
								)}
							/>
							<span>{post._count.comments}</span>
						</Button>
					</div>
					{/* Comments section */}
					<div
						className={clsx(
							'overflow-hidden transition-all duration-300 ease-in-out',
							showComments ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
						)}
					>
						<div className='space-y-4 border-t pt-4'>
							{post.comments.map((comment) => (
								<div key={comment.id} className='flex space-x-3 py-4'>
									<Avatar className='size-8 flex-shrink-0'>
										<AvatarImage
											src={(comment.author.image as string) ?? '/avatar.png'}
										/>
									</Avatar>
									<div className='flex-1 min-w-0 flex flex-col gap-4'>
										<div className='flex flex-wrap items-center gap-x-2 gap-y-1'>
											<span className='font-medium text-sm'>
												{comment.author.name}
											</span>
											<span className='text-sm text-muted-foreground'>
												@{comment.author.username}
											</span>
											<span className='text-sm text-muted-foreground'>•</span>
											<span className='text-sm text-muted-foreground'>
												{formatDistanceToNow(new Date(comment.createdAt))} ago
											</span>
										</div>
										<p className='text-sm break-words'>{comment.content}</p>
									</div>
								</div>
							))}
						</div>
						{user ? (
							<div className='flex space-x-3 mt-4'>
								<Avatar className='size-8 flex-shrink-0'>
									<AvatarImage
										src={(user?.imageUrl as string) ?? '/avatar.png'}
									/>
								</Avatar>
								<div className='flex-1'>
									<Textarea
										placeholder='Write a comment...'
										value={newComment}
										onChange={(e) => setNewComment(e?.target?.value)}
										className='min-h-[80px] resize-none'
									/>
									<div className='flex justify-end mt-2'>
										<Button
											size='sm'
											onClick={handleAddComment}
											className='flex items-center gap-2'
											disabled={!newComment.trim() || isCommenting}
										>
											{isCommenting ? (
												<>
													<Loader2 className='size-4 animate-spin' />
													Posting...
												</>
											) : (
												<>
													<SendIcon className='size-4' />
													Comment
												</>
											)}
										</Button>
									</div>
								</div>
							</div>
						) : (
							<SignInButton mode='modal'>
								<Button variant='outline' className='w-full mt-4'>
									Sign in to comment
								</Button>
							</SignInButton>
						)}
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default PostCard;
