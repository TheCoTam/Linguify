'use server';

import { db } from '../lib/db';
import { currentUserId } from '@/lib/auth';

export const getBlogs = async () => {
  try {
    const blogs = await db.blog.findMany({
      orderBy: { createdAt: 'desc' },
      include: { user: true, FavoriteBlog: true },
    });
    return blogs;
  } catch (error) {
    console.log('[actions/blogs]', error);
    return null;
  }
};

export const getBlogById = async (id: string) => {
  try {
    const blog = await db.blog.findUnique({
      where: { id },
      include: {
        user: true,
        comments: { include: { user: true, Like: true } },
        FavoriteBlog: true,
      },
    });
    return blog;
  } catch {
    return null;
  }
};

export const isFavoriteBlog = async (
  FavoriteByUser: {
    id: string;
    userId: string;
    blogId: string;
    createdAt: Date;
    updatedAt: Date;
  }[],
) => {
  try {
    const userId = await currentUserId();
    let res = false;
    for (const favorite of FavoriteByUser) {
      if (favorite.userId === userId) {
        res = true;
        break;
      }
    }
    return res;
  } catch (error) {
    console.log('[actions/blogs]', error);
    return false;
  }
};

export const addFavoriteBlog = async (blogId: string) => {
  try {
    const userId = await currentUserId();
    if (!userId) return null;
    const favorite = await db.favoriteBlog.create({
      data: {
        blogId,
        userId,
      },
    });
    return favorite;
  } catch (error) {
    console.log('[actions/blogs]', error);
    return null;
  }
};

export const removeFavoriteBlog = async (blogId: string) => {
  try {
    const userId = await currentUserId();
    if (!userId) return null;
    const favorite = await db.favoriteBlog.deleteMany({
      where: {
        blogId,
        userId,
      },
    });
    return favorite;
  } catch (error) {
    console.log('[actions/blogs]', error);
    return null;
  }
};

export const getFavoriteBlogs = async (userId: string) => {
  try {
    const favoriteBlogs = await db.favoriteBlog.findMany({
      where: {
        userId,
      },
      include: {
        user: true,
        blog: true,
      },
    });
    return favoriteBlogs;
  } catch (error) {
    console.log('[actions/blogs]', error);
    return null;
  }
};
