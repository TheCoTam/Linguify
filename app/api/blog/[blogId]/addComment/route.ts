import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { currentUserId } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const userId = await currentUserId();

    const { content, blogId } = await req.json();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!content) {
      return new NextResponse('Bad Request: Comment is missing', {
        status: 400,
      });
    }

    if (!blogId) {
      return new NextResponse('Bad Request: BlogId is missing', {
        status: 400,
      });
    }

    const comment = await db.comment.create({
      data: {
        content,
        owner: userId,
        blogId,
      },
    });

    const blog = await db.blog.findUnique({
      where: {
        id: blogId,
      },
    });

    if (!blog) {
      return new NextResponse('Bad Request: Blog not found', {
        status: 400,
      });
    }

    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return new NextResponse('Bad Request: User not found', {
        status: 400,
      });
    }

    await db.notification.create({
      data: {
        userId: blog.owner,
        message: `${user?.name} commented on your blog`,
        image: user.image ? user.image : '/images/no-image.png',
        href: `/blog/${blogId}`,
      },
    });
    return NextResponse.json(comment);
  } catch (error) {
    console.log('[addComment]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
