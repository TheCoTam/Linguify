'use server';

import { db } from '@/lib/db';

export const getBlogs = async (userId: string) => {
  try {

    const blogs = await db.blog.findMany({
      where: {
        owner: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return blogs;
  } catch (error) {
    console.log('[actions/get-blogs]', error);
    return null;
  }
};
