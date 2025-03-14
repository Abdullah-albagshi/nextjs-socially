'use server';

import prisma from '@/lib/prisma';
import { auth, currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

export async function syncUser() {
	try {
		const { userId } = await auth();
		const user = await currentUser();

		if (!user || !userId) return;
		const existingUser = await prisma.user.findUnique({
			where: {
				clerkId: userId as string,
			},
		});

		if (existingUser) return existingUser;

		const dbUser = prisma.user.create({
			data: {
				clerkId: userId as string,
				name: `${user?.firstName || ''} ${user?.lastName || ''}`,
				email: user?.emailAddresses[0].emailAddress as string,
				username:
					(user?.username as string) ||
					(user?.emailAddresses[0].emailAddress.split('@')[0] as string),
				image: user?.imageUrl,
			},
		});
		return dbUser;
	} catch (err) {
		console.log('Error Syncing User', err);
	}
}

export async function getUserById(clerkId: string) {
	return prisma.user.findUnique({
		where: {
			clerkId: clerkId,
		},
		include: {
			_count: {
				select: {
					followers: true,
					following: true,
					posts: true,
				},
			},
		},
	});
}

export async function getDBUserId() {
	const { userId: clerkId } = await auth();
	if (!clerkId) return null;

	const user = await getUserById(clerkId);

	if (!user) throw new Error('User Not found');

	return user.id;
}

export async function getRandomUsers() {
	try {
		const userId = await getDBUserId();

    if(!userId) return [];

		const randomUsers = await prisma.user.findMany({
			where: {
				AND: [
					{ NOT: { id: userId } },
					{
						NOT: {
							followers: {
								some: {
									followerId: userId,
								},
							},
						},
					},
				],
			},
			select: {
				id: true,
				name: true,
				username: true,
				image: true,
				_count: {
					select: {
						followers: true,
					},
				},
			},
			take: 3,
		});
		return randomUsers;
	} catch (error) {
		console.error('Error retuning suggested Users', error);
		return [];
	}
}

export async function toggleFollow(targetedUserId: string) {
	try {
		const userId = await getDBUserId();
    if(!userId) return;
		if (userId === targetedUserId) throw new Error("You Can't follow yourself");
		const existingFollow = await prisma.follows.findUnique({
			where: {
				followerId_followingId: {
					followerId: userId,
					followingId: targetedUserId,
				},
			},
		});

		if (existingFollow) {
			// unfollow
			await prisma.follows.delete({
				where: {
					followerId_followingId: {
						followerId: userId,
						followingId: targetedUserId,
					},
				},
			});
		} else {
			// follow
			await prisma.$transaction([
				prisma.follows.create({
					data: {
						followerId: userId,
						followingId: targetedUserId,
					},
				}),
				prisma.notification.create({
					data: {
						type: 'FOLLOW',
						userId: targetedUserId,
						creatorId: userId,
					},
				}),
			]);
		}

    revalidatePath('/')
    return {
      success: true
    }
	} catch (error) {
    console.log("Error in toggleFollow", error)
    return {
      success: false,
      error: 'Error Toggling follow'
    }
  }
}
