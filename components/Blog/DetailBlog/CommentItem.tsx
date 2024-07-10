import Image from 'next/image';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Ellipsis } from 'lucide-react';

import { calculateTimeComment } from '@/lib/utils';
import { likeComment, unLikeComment } from '@/actions/comment';

interface props {
  commentId: string;
  content: string;
  commentOwner: any;
  createdAt: Date;
  updatedAt: Date;
  isLiked: boolean;
  currentUserId: string;
  numLikes: number;
}

function CommentItem({
  commentId,
  content,
  commentOwner,
  createdAt,
  updatedAt,
  isLiked,
  currentUserId,
  numLikes,
}: props) {
  const router = useRouter();

  const handleLike = async () => {
    try {
      await likeComment(commentId, currentUserId);
      router.refresh();
    } catch (error) {
      console.log('[CommentItem]', error);
      toast.error('Something went wrong!');
    }
  };

  const handleUnLike = async () => {
    try {
      await unLikeComment(commentId, currentUserId);
      router.refresh();
    } catch (error) {
      console.log('[CommentItem]', error);
      toast.error('Something went wrong!');
    }
  };
  return (
    <div className="flex flex-row gap-4">
      <div className="flex justify-center items-center w-[40px] h-[40px] rounded-full overflow-hidden">
        <Image
          src={
            commentOwner?.image
              ? commentOwner?.image
              : '/images/no-avatar.png'
          }
          alt=""
          width={40}
          height={40}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="font-semibold">{commentOwner?.name}</div>
        <div className="flex items-center gap-1 group">
          <div
            dangerouslySetInnerHTML={{ __html: content }}
            className="px-3 py-2 bg-slate-200 rounded-xl"
          ></div>
          <Ellipsis className="hidden group-hover:block p-1 cursor-pointer hover:bg-slate-100 rounded-full active:bg-slate-200 active:scale-90" />
        </div>
        <div className="flex flex-row gap-3 relative text-xs font-semibold text-gray-400">
          <div>{calculateTimeComment(createdAt, updatedAt)}</div>
          {isLiked ? (
            <div
              className="text-blue-500 cursor-pointer"
              onClick={handleUnLike}
            >
              Liked
            </div>
          ) : (
            <div onClick={handleLike} className="cursor-pointer">
              Like
            </div>
          )}
          <div className="cursor-pointer">Reply</div>

          {numLikes !== 0 && (
            <div className="absolute flex flex-row gap-1 w-max p-[2px] -right-[5px] -top-[17px] bg-slate-100 rounded-2xl">
              <Image
                src="/icons/likeIcon.svg"
                alt="like"
                width={16}
                height={16}
              />
              <div>{numLikes}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CommentItem;
