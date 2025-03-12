"use client"
import React from 'react';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '../ui/alert-dialog';
import { Button } from '../ui/button';
import { Loader2, Trash2Icon } from 'lucide-react';

type Props = {
	isDeleting: boolean;
	onDelete: () => Promise<void>;
	title?: string;
	description?: string;
};

const DeletePostDialog = ({
	isDeleting,
	onDelete,
	title = 'Delete Post',
	description = 'This Action Cannot be undone',
}: Props) => {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button
					variant={'ghost'}
					size={'sm'}
					className='text-muted-foreground hover:text-red-500 -mr-2'
				>
					{isDeleting ? (
						<Loader2 className='size-4 animate-spin' />
					) : (
						<Trash2Icon className='size-4' />
					)}
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<AlertDialogDescription>{description}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={onDelete}
						className='bg-red-500 hover:bg-red-600 text-white'
						disabled={isDeleting}
					>
						{isDeleting ? 'Deleting Post...' : 'Delete Post'}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default DeletePostDialog;
