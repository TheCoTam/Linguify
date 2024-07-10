'use client';

import { useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import { addFavoriteBlog, removeFavoriteBlog } from '@/actions/blogs';
// import CommentModal from './CommentModal/CommentModal';
const CommentModal = dynamic(
  () => import('./CommentModal/CommentModal'),
);

interface props {
  name: string;
  avt: string;
  blogId: string;
  currentUser: any;
  comments: any[];
  isFavorite: boolean;
}

function UserInfo({
  name,
  avt,
  blogId,
  currentUser,
  comments,
  isFavorite,
}: props) {
  const router = useRouter();
  const [commentModal, setCommentModal] = useState(false);

  const openCommentModal = () => setCommentModal(true);
  const closeCommentModal = () => setCommentModal(false);
  const handleAddFavorite = async () => {
    try {
      const res = await addFavoriteBlog(blogId);
      toast.success('Added to favorites');
      router.refresh();
    } catch (error) {
      console.log('[UserInfo]', error);
      toast.error('Something went wrong!');
    }
  };
  const handleRemoveFavorite = async () => {
    try {
      const res = await removeFavoriteBlog(blogId);
      toast.success('Removed from favorite');
      router.refresh();
    } catch (error) {
      console.log('[UserInfo]', error);
      toast.error('Something went wrong!');
    }
  };
  return (
    <div className="flex justify-center w-full md:w-[25%]">
      <div className="w-max h-max sticky top-[80px]">
        <div className="flex flex-row items-center gap-3">
          <div className="flex justify-center items-center w-[50px] h-[50px] rounded-full overflow-hidden">
            <Image
              src={avt}
              alt="avatar"
              width={50}
              height={50}
              className="w-full h-full object-cover"
            />
          </div>
          <div>{name}</div>
        </div>
        <hr className="my-3" />
        <div className="flex flex-row justify-center items-center gap-[50px]">
          {isFavorite ? (
            <Image
              src="/icons/solidHeartIcon.svg"
              alt=""
              width={24}
              height={24}
              onClick={handleRemoveFavorite}
              className="hover:brightness-95 cursor-pointer"
            />
          ) : (
            <Image
              src="/icons/heartIcon.svg"
              alt=""
              width={24}
              height={24}
              onClick={handleAddFavorite}
              className="hover:brightness-50 cursor-pointer"
            />
          )}
          <Image
            src="/icons/commentIcon.svg"
            alt=""
            width={24}
            height={24}
            onClick={openCommentModal}
            className="hover:brightness-50 cursor-pointer"
          />
        </div>
      </div>
      {commentModal && (
        <CommentModal
          closeModal={closeCommentModal}
          blogId={blogId}
          currentUser={currentUser}
          comments={comments}
        />
      )}
    </div>
  );
}

export default UserInfo;
