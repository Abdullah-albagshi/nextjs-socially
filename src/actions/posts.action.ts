'use server';

import prisma from '@/lib/prisma';
import { getDBUserId } from './user.action';
import { revalidatePath } from 'next/cache';

export async function createPost(content: string, imageUrl?: string) {
	try {
		const userId = await getDBUserId();
    if(!userId) return;
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
      orderBy:{
        createdAt: 'desc'
      },
      include:{
        author:{
          select:{
            name: true,
            username:true,
            image: true
          }
        },
        comments:{
          select:{
            author: {
              select:{
                id:true,
                username:true,
                image:true,
                name:true
              }
            }
          },
          orderBy:{
            createdAt: 'asc'
          }
        },
        likes:{
          select:{
            userId:true
          }
        },
        _count:{
          select:{
            likes:true,
            comments:true
          }
        }
      }
    })

    return posts;
  } catch (error) {
    console.error("Something went Wrong in getPosts",error)
  }
}