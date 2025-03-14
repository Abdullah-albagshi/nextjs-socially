'use server';

import prisma from '@/lib/prisma';
import { getDBUserId } from './user.action';

export async function getNotifications() {
	try {
		const user = await getDBUserId();

		if (!user) return [];

		const notifications = await prisma.notification.findMany({
			orderBy: {
				createdAt: 'desc',
			},
			where: {
				userId: user,
			},
			include: {
				creator: {
					select: {
						id: true,
						name: true,
						username: true,
						image: true,
					},
				},
				comment: {
					select: {
						content: true,
						id: true,
						createdAt: true,
					},
				},
				post: {
					select: {
						content: true,
						id: true,
						image: true,
					},
				},
			},
		});
		return notifications;
	} catch (error) {
		console.error('Failed to Get notifications', error);
		// return { success: false, error: 'Failed to Get notifications' };
	}
}

export async function markNotificationAsRead(notificationsId: string[]) {
	try {
		await prisma.notification.updateMany({
			where: {
				id: {
					in: notificationsId,
				},
			},
			data: {
				read: true,
			},
		});
		return { success: true };
	} catch (error) {
		console.log('Error Marking Notification as read', error);
		return { success: false, error: error };
	}
}
