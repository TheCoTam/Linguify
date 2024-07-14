import { currentUserId } from '@/lib/auth';
import { redirect } from 'next/navigation';

import { getBlogById } from '@/actions/blogs';
import EditBlogAction from '@/components/Me/my-blogs/edit-confirm';
import BlogTitleForm from '@/components/Me/my-blogs/title-form';
import BlogContentForm from '@/components/Me/my-blogs/content-form';
import BlogAccessForm from '@/components/Me/my-blogs/access-form';
import { IconBadge } from '@/components/icon-badge';
import { NotepadText, Eye } from 'lucide-react';

const EditBlog = async ({
  params,
}: {
  params: { blogId: string };
}) => {
  const userId = currentUserId();

  if (!userId) {
    return redirect('/');
  }

  const blog = await getBlogById(params.blogId);

  if (!blog) {
    return redirect('/');
  }

  return (
    <div className="w-[80%]">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-2xl font-medium">Blog Editing</h1>
        <EditBlogAction blogId={params.blogId} />
      </div>
      <div className="lg:grid lg:grid-cols-3 mt-16 lg:gap-6 space-y-5 md:space-y-0">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-x-2">
            <IconBadge icon={NotepadText} />
            <h2 className="text-xl">Customizing Blog</h2>
          </div>
          <div>
            <BlogTitleForm
              initialData={blog}
              blogId={params.blogId}
            />
            <BlogContentForm
              initialData={blog}
              blogId={params.blogId}
            />
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="flex items-center gap-x-2">
            <IconBadge icon={Eye} />
            <h2 className="text-xl">Access Settings</h2>
          </div>
          <BlogAccessForm initialData={blog} blogId={params.blogId} />
        </div>
      </div>
    </div>
  );
};

export default EditBlog;
