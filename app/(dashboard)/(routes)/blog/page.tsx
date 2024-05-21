import { redirect } from 'next/navigation';

import Pagiantion from '@/components/Blog/Pagination';
import Header from '@/components/Blog/Header';
import NoBlog from '@/components/Blog/NoBlog';
import BlogItem from '@/components/Blog/BlogItem';
import { getBlogs } from '@/actions/blogs';
import { getUserById } from '@/data/user';
import { isFavoriteBlog } from '@/actions/blogs';
import { currentUserId } from '@/lib/auth';

interface props {
  searchParams?: { page?: string };
}

async function Blog({ searchParams }: props) {
  // Pagination
  let page = parseInt(searchParams?.page || '1', 10);
  page = !page || page < 1 ? 1 : page;
  const perPage = 4;
  // End Pagination

  const data = await getBlogs();
  if (!data) {
    redirect('/');
  }
  const blogOwners = await Promise.all(
    data.map((blog: any) => getUserById(blog.owner)),
  );

  const userId = await currentUserId();
  if (!userId) return redirect('/');

  const favoriteBlogs = await Promise.all(
    data.map((blog: any) => isFavoriteBlog(blog.id, userId)),
  );

  return (
    <div className="flex flex-col justify-center px-10 pt-6 mb-6">
      <Header />

      {!data.length ? (
        <NoBlog />
      ) : (
        <div className="flex flex-col-reverse lg:flex-row gap-8 w-full">
          <div className="flex flex-col gap-4 w-full lg:w-[75%] xl:w-[60%]">
            {/* Blogs data from server */}
            {data
              ?.slice(
                perPage * (page - 1),
                perPage * (page - 1) + perPage,
              )
              .map((item: any, index: any) => {
                if (!item.avt) {
                  item.avt = '/images/no-image.png';
                }
                const currentBlogIndex = (page - 1) * perPage + index;

                return (
                  <BlogItem
                    key={index}
                    data={item}
                    owner={blogOwners[currentBlogIndex]}
                    isFavoriteBlog={favoriteBlogs[currentBlogIndex]}
                    currentUserId={userId}
                  />
                );
              })}
            {/* Pagination bar */}
            <Pagiantion
              totalBlogs={data.length}
              page={page}
              perPage={perPage}
            />
          </div>
        </div>
      )}
    </div>
  );
}
export default Blog;
