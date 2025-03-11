'use server';

import prisma from '@/lib/prisma';
import { getDBUserId } from './user.action';
import { revalidatePath } from 'next/cache';

export async function createPost(content: string, imageUrl?: string) {
	try {
		const userId = await getDBUserId();
		if (!userId) return;
		const post = await prisma.post.create({
			data: {
				content,
				image: imageUrl,
				authorId: userId,
			},
		});
		revalidatePath('/');
		return {
			success: true,
			post,
		};
	} catch (error) {
		console.error('Failed to create Post', error);
		return { success: false, error: 'Failed to Create Post' };
	}
}

export async function getPosts() {
	try {
		const posts = await prisma.post.findMany({
			orderBy: {
				createdAt: 'desc',
			},
			include: {
				author: {
					select: {
						name: true,
						username: true,
						image: true,
					},
				},
				comments: {
					select: {
						author: {
							select: {
								id: true,
								username: true,
								image: true,
								name: true,
							},
						},
					},
					orderBy: {
						createdAt: 'asc',
					},
				},
				likes: {
					select: {
						userId: true,
					},
				},
				_count: {
					select: {
						likes: true,
						comments: true,
					},
				},
			},
		});

		return posts;
	} catch (error) {
		console.error('Something went Wrong in getPosts', error);
	}
}

export async function toggleLike(postId: string) {
	try {
		const userId = await getDBUserId();
		if (!userId) return;

		// check if like exists
		const existingLike = await prisma.like.findUnique({
			where: {
				userId_postId: {
					userId,
					postId,
				},
			},
		});

		const post = await prisma.post.findUnique({
			where: { id: postId },
			select: { authorId: true },
		});

		if (!post) throw new Error('Post Not Found');

		if (existingLike) {
			await prisma.like.delete({
				where: {
					userId_postId: {
						userId,
						postId,
					},
				},
			});
		} else {
			prisma.$transaction([
				prisma.like.create({
					data: {
						postId,
						userId,
					},
				}),
				...(post.authorId !== userId
					? [
							prisma.notification.create({
								data: {
									type: 'LIKE',
									creatorId: postId,
									postId: postId,
									userId: post.authorId,
								},
							}),
					  ]
					: []),
			]);
			revalidatePath('/');
			return { success: true };
		}
	} catch (error) {
		console.log('Error Liking/Unlike Post', error);
		return { success: false, error: 'Error Liking/Unlike Post' };
	}
}

export async function createComment(postId: string, content: string) {
	try {
		const userId = await getDBUserId();
		if (!userId) return;
		if (!content) throw new Error('Content is Required');

		const post = await prisma.post.findUnique({
			where: { id: postId },
			select: { authorId: true },
		});

		if (!post) throw new Error('Post Not Found');

		const comment = await prisma.$transaction(async (tx) => {
			const comment = await tx.comment.create({
				data: {
					content,
					authorId: userId,
					postId,
				},
			});

			if (post.authorId !== userId) {
				await tx.notification.create({
					data: {
						type: 'COMMENT',
						userId: post.authorId,
						creatorId: userId,
						commentId: comment.id,
						postId,
					},
				});
			}

			return comment;
		});

		revalidatePath('/');
		return { success: true, content: comment };
	} catch (error) {
		console.log('Error Creating Comment', error);
		return { success: false, error: 'Error Creating Comment' };
	}
}

export async function deletePost(postId: string) {
	try {
		const userId = await getDBUserId();
		if (!userId) return;
		const post = await prisma.post.findUnique({
			where: { id: postId },
			select: { authorId: true },
		});

		if (!post) throw new Error('Post Not Found');
    if (post.authorId !== userId) throw new Error("Unauthorized - Can't delete other Posts")
		await prisma.post.delete({
			where: { id: postId },
		});

		revalidatePath('/');
		return { success: true };
	} catch (error) {
    console.log("Failed to delete Post", error);
    return {success: false, error: "Failed to delete Post"};
  }
}

