'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { addFavoriteBlog, removeFavoriteBlog } from '@/actions/blogs';
import { calculateTime } from '@/lib/utils';

interface props {
  data: any;
  owner: any;
  isFavoriteBlog?: boolean;
}

function BlogItem({ data, owner, isFavoriteBlog }: props) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/blog/${data.id}`);
  };
  const ownerImage = owner.image
    ? owner.image
    : '/images/no-avatar.png';

  const handleAddFavorite = async () => {
    try {
      const res = await addFavoriteBlog(data.id);
      toast.success('Added to favorites');
      router.refresh();
    } catch (error) {
      console.log('[UserInfo]', error);
      toast.error('Something went wrong!');
    }
  };
  const handleRemoveFavorite = async () => {
    try {
      await removeFavoriteBlog(data.id);
      toast.success('Remove from favorites');
      router.refresh();
    } catch (error) {
      console.log('[UserInfo]', error);
      toast.error('Something went wrong!');
    }
  };
  return (
    <div className="flex flex-col px-4 py-4 border-2 border-solid border-gray-300 rounded-lg overflow-hidden shadow">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2 text-xs">
          <div className="flex justify-center items-center w-8 h-8 rounded-full overflow-hidden border border-solid border-gray-300">
            <Image
              src={ownerImage}
              width={25}
              height={25}
              alt=""
              className="object-cover w-full h-full"
            />
          </div>
          <div className="font-semibold text-base">{owner.name}</div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <div className="cursor-pointer">
            {isFavoriteBlog ? (
              <Image
                src="/icons/solidHeartIcon.svg"
                alt=""
                width={24}
                height={20}
                onClick={handleRemoveFavorite}
              />
            ) : (
              <Image
                src="/icons/heartIcon.svg"
                alt=""
                width={24}
                height={20}
                onClick={handleAddFavorite}
              />
            )}
          </div>
          <div className="cursor-pointer">
            <Image
              src="/icons/dotsIcon.svg"
              alt=""
              width={24}
              height={24}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col-reverse md:flex-row gap-8 mt-4">
        <div className="flex flex-col gap-4">
          <div
            className="text-lg font-bold max-h-[84px] line-clamp-3 hover:cursor-pointer"
            onClick={handleClick}
          >
            {data.title}
          </div>
          <div
            className="h-[48px] text-[15px] line-clamp-2"
            dangerouslySetInnerHTML={{ __html: data.content }}
          ></div>
        </div>
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

export default BlogItem;
