import { redirect } from 'next/navigation';

import Content from '@/components/Blog/DetailBlog/Content';
import UserInfo from '@/components/Blog/DetailBlog/UserInfo';
import { getBlogById } from '@/actions/blogs';
import { getUserById } from '@/data/user';
import { currentUserId } from '@/lib/auth';
import { isFavoriteBlog } from '@/actions/blogs';

interface props {
  params: { blogId: string };
}

async function BlogDetail({ params }: props) {
  const userId = await currentUserId();
  if (!userId) return redirect('/');

  const currentUser = await getUserById(userId);
  if (!currentUser) return redirect('/');

  const currentBlog = await getBlogById(params.blogId);
  if (!currentBlog) return redirect('/');

  const owner = currentBlog.user;

  const isFavorite = await isFavoriteBlog(currentBlog.FavoriteBlog);

  return (
    <div className="flex flex-col md:flex-row gap-4 px-6 py-5 relative">
      <UserInfo
        name={owner.name || 'Not found'}
        avt={owner.image ? owner.image : '/images/no-avatar.png'}
        blogId={params.blogId}
        currentUser={currentUser}
        comments={currentBlog.comments}
        isFavorite={isFavorite}
      />
      <Content
        title={currentBlog.title}
        content={currentBlog.content}
      />
    </div>
  );
}

export default BlogDetail;
