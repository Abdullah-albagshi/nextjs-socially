'use client';
import {
	getNotifications,
	markNotificationAsRead,
} from '@/actions/notifications.action';
import React, { useEffect } from 'react';
import { CardHeader, CardTitle } from '../ui/card';

type Notifications = NonNullable<Awaited<ReturnType<typeof getNotifications>>>;

type Props = {
	notifications: Notifications | undefined;
};

const NotificationCounter = ({ notifications }: Props) => {
	const notificationsId = notifications?.map((item) => item.id);
  const unreadNotificationsCount = notifications?.length
	useEffect(() => {
    if(!notificationsId) return;
    markNotificationAsRead(notificationsId);
	}, []);

	return (
		<CardHeader className='border-b'>
			<div className='flex items-center justify-between'>
				<CardTitle>Notifications</CardTitle>
				<span className='text-sm text-muted-foreground'>{unreadNotificationsCount} unread</span>
			</div>
		</CardHeader>
	);
};

export default NotificationCounter;
