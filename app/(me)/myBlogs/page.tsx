import { currentUserId } from '@/lib/auth';
import { redirect } from 'next/navigation';
import BlogsList from './_components/blog-list';
import { getBlogs } from '@/actions/get-blog';

const MyBlogPage = async () => {
  const userId = await currentUserId();

  if (!userId) {
    return redirect('/');
  }

  const blogs = await getBlogs(userId);

  return (
    <div className="flex justify-center w-full">
      {!blogs || blogs.length === 0 ? (
        <div>You haven&apos;t created any Blogs yet.</div>
      ) : (
        <BlogsList items={blogs} />
      )}
    </div>
  );
};

export default MyBlogPage;
