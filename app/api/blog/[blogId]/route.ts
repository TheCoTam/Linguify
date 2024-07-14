import { getBlogById } from '@/actions/blogs';
import { currentUserId } from '@/lib/auth';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  { params }: { params: { blogId: string } },
) {
  try {
    const userId = await currentUserId();

    const values = await req.json();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const blog = await getBlogById(params.blogId);

    if (!blog) {
      return new NextResponse('Not Found', { status: 404 });
    }

    const newBlog = await db.blog.update({
      where: {
        id: params.blogId,
        owner: userId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(newBlog, { status: 200 });
  } catch (error) {
    console.log('[BLOG_ID]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { blogId: string } },
) {
  try {
    const userId = await currentUserId();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const blog = await getBlogById(params.blogId);

    if (!blog) {
      return new NextResponse('Not Found', { status: 404 });
    }

    const deletedBlog = await db.blog.delete({
      where: {
        id: params.blogId,
        owner: userId,
      },
    });

    return NextResponse.json(deletedBlog, { status: 200 });
  } catch (error) {
    console.log('[BLOG_ID_DELETE]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
