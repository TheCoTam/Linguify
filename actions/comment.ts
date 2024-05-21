'use server';

import { db } from '../lib/db';

export const likeComment = async (
  commentId: string,
  userId: string,
) => {
  try {
    const like = await db.like.create({
      data: {
        commentId,
        userId,
      },
    });
    return like;
  } catch (error) {
    console.log('[actions/comments]', error);
    return null;
  }
};

export const unLikeComment = async (
  commentId: string,
  userId: string,
) => {
  try {
    const like = await db.like.deleteMany({
      where: {
        commentId,
        userId,
      },
    });
    return like;
  } catch (error) {
    console.log('[actions/comments]', error);
    return null;
  }
};
