'use client';
import React, { useState } from 'react';
import { Separator } from './ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { useUser } from '@clerk/nextjs';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ImageIcon, Loader2Icon, SendIcon } from 'lucide-react';
import { createPost } from '@/actions/posts.action';
import toast from 'react-hot-toast';
import ImageUpload from './ImageUpload';

function CreatePost() {
	const [content, setContent] = useState<string>('');
	const [imageUrl, setImageUrl] = useState<string>('');
	const [isPosting, setIsPosting] = useState<boolean>(false);
	const [showImageUpload, setShowImageUpload] = useState<boolean>(false);
	const { user } = useUser();
	const maxContentLength = 300;
	const handleSubmit = async () => {
		if (!content.trim() && !imageUrl) return;
		setIsPosting(true);
		try {
			const res = await createPost(content, imageUrl);
			if (res?.success) {
				setContent('');
				setImageUrl('');
				setShowImageUpload(false);
				toast.success('Post Create Successfully');
			}
		} catch {
			toast.error('Failed to create post!');
		} finally {
			setIsPosting(false);
		}
	};

	const ContentLength = () => {
		const length = content.length;
		const color =
			length > 290
				? 'text-red-600'
				: length > 270
				? 'text-amber-600'
				: 'text-muted-foreground';
		return (
			<div className='absolute right-6 '>
				<span className={`${color}`}>{length}</span>
				<span className='text-muted-foreground'> / {maxContentLength}</span>
			</div>
		);
	};

	return (
		<Card className='mb-6'>
			<CardContent className='pt-6'>
				<div className='space-y-4'>
					<div className='flex space-x-4 mb-4'>
						<Avatar className='w-10 h-10 border-2'>
							<AvatarImage src={user?.imageUrl as string} />
							<AvatarFallback>{user?.username}</AvatarFallback>
						</Avatar>
						<div className='relative flex-1'>
							<Textarea
								placeholder="What's on your mind?"
								className='min-h-[100px] resize-none border-none focus-visible:ring-0  p-0 text-base'
								value={content}
								onChange={(e) => setContent(e?.target?.value)}
								disabled={isPosting}
								maxLength={maxContentLength}
							/>
							{ContentLength()}
						</div>
					</div>
				</div>
				<Separator className='my-7' />

				{(showImageUpload || imageUrl) && (
          <>
					<div className='border rounded-lg p-4'>
						<ImageUpload
							endpoint='postImage'
							value={imageUrl}
							onChange={(url) => {
								setImageUrl(url);
								if (!url) setShowImageUpload(false);
							}}
						/>
					</div>
				<Separator className='my-7' />
        </>
				)}

				<div className='flex justify-between'>
					<Button
						variant='ghost'
						className='flex gap-2 text-muted-foreground items-center justify-center text-base'
						onClick={() => {
							setShowImageUpload(!showImageUpload);
						}}
						disabled={isPosting}
					>
						<ImageIcon className='size-4 mr-2' />
						<p>Photo</p>
					</Button>
					<Button
						onClick={handleSubmit}
						disabled={isPosting || (!content?.trim() && !imageUrl)}
					>
						{isPosting ? (
							<>
								<Loader2Icon className='size-4 mr-2 animate-spin' />
								Posting...
							</>
						) : (
							<>
								<SendIcon className='size-4 mr-2 ' />
								Post
							</>
						)}
					</Button>
				</div>
			</CardContent>
		</Card>
		// <div className='border p-6'>
		// 	<div className=''>
		// 		<Avatar className='w-16 h-16 border-2'>
		// 			<AvatarImage src={user.image as string} />
		// 			<AvatarFallback>{user?.username}</AvatarFallback>
		// 		</Avatar>
		//     <Textarea placeholder="Type your message here." />
		// 	</div>
		// 	<Separator />
		// </div>
	);
}

export default CreatePost;
