import { Blog } from '@prisma/client';
import BlogCard from './blog-card';

interface BlogListProps {
  items: Blog[];
}

const BlogsList = ({ items }: BlogListProps) => {
  return (
    <div className="md:w-[80%] lg:w-[70%] xl:w-[60%] space-y-5 md:p-6 p-2">
      {items.map((item) => (
        <BlogCard key={item.id} data={item} />
      ))}
    </div>
  );
};

export default BlogsList;
