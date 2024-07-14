'use server';

import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';
import { getVerificationTokenByToken } from '@/data/verification-token';

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);
  if (!existingToken) {
    return {
      error: 'Token does not exist!',
    };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return {
      error: 'Token has expired!',
    };
  }

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return { error: 'Email does not exist!' };
  }

  if (!existingUser.emailVerified) {
    await db.notification.create({
      data: {
        userId: existingUser.id,
        image: '/images/original.png',
        message: 'Welcome to Linguify! ️🎉️🎉️🎉',
      },
    });
  }

  if (existingUser.email !== existingToken.newEmail) {
    await db.notification.create({
      data: {
        userId: existingUser.id,
        image: '/images/original.png',
        message: 'You have changed your email!',
        href: '/settings',
      },
    });
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.newEmail || existingToken.email,
    },
  });

  await db.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return { success: 'Email verified!' };
};
