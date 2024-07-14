'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { calculateTime } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Pencil } from 'lucide-react';

interface props {
  data: any;
}

function BlogCard({ data }: props) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/blog/${data.id}`);
  };
  return (
    <div className="flex flex-col px-4 py-4 border-2 border-solid border-gray-300 rounded-lg overflow-hidden shadow w-full">
      <div className="flex flex-col space-y-2 mt-4">
        <div className="flex items-center justify-between w-full">
          <div
            className="text-lg font-bold max-h-[84px] line-clamp-3 hover:cursor-pointer"
            onClick={handleClick}
          >
            {data.title}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-4 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link href={`/myBlogs/${data.id}/edit`}>
                <DropdownMenuItem>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div
          className="h-[48px] text-[15px] line-clamp-2"
          dangerouslySetInnerHTML={{ __html: data.content }}
        ></div>
      </div>
      <div className="text-xs text-gray-400">
        {calculateTime(data.updatedAt)}
      </div>
      <div className="text-xs text-muted-foreground mt-2 italic">
        *You can click the title to see the post and add comment
      </div>
    </div>
  );
}

export default BlogCard;
