'use server';

import prisma from '@/lib/prisma';
import { auth, currentUser } from '@clerk/nextjs/server';

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
    console.log('dbUser')
		return dbUser;
	} catch (err) {
		console.log('Error Syncing User', err);
	}
}
