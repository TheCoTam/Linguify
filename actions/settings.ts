'use server';

import * as z from 'zod';

import { db } from '@/lib/db';

import bcrypt from 'bcryptjs';
import { SettingsSchema } from '@/schemas';
import { getUserByEmail, getUserById } from '@/data/user';
import { currentUser } from '@/lib/auth';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/lib/mail';

export const settings = async (
  values: z.infer<typeof SettingsSchema>,
) => {
  const user = await currentUser();

  if (!user) {
    return { error: 'Unauthorized' };
  }

  const dbUser = await getUserById(user.id!);

  if (!dbUser) {
    return { error: 'Unauthorized' };
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== user.id) {
      return { error: 'Email already in use!' };
    }

    const verificationToken = await generateVerificationToken(
      dbUser.email,
      values.email,
    );

    if (!verificationToken.newEmail) {
      return { error: 'Something went wrong!' };
    }

    await sendVerificationEmail(
      verificationToken.newEmail,
      verificationToken.token,
    );

    return { success: 'Verification email sent!' };
  }

  if (
    values.password &&
    values.newPassword &&
    values.confirmNewPassword === values.newPassword &&
    dbUser.password
  ) {
    const passwordMatch = await bcrypt.compare(
      values.password,
      dbUser.password,
    );

    if (!passwordMatch) {
      return { error: 'Incorrect password!' };
    }

    const hashedNewPassword = await bcrypt.hash(
      values.newPassword,
      10,
    );

    values.password = hashedNewPassword;
    values.newPassword = undefined;
    values.confirmNewPassword = undefined;
  }

  await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
    },
  });

  return { success: 'Settings updated' };
};
