import Image from 'next/image';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Loader } from 'lucide-react';

import styles from '@/styles/editor.module.css';
import CommentItem from '../CommentItem';
import Editor from '../../Editor';
import Heading from './Heading';
import CloseButton from './CloseButton';
import { CommentSchema } from '@/schemas';
import { useRouter } from 'next/navigation';

interface props {
  closeModal: () => void;
  blogId: string;
  currentUser: any;
  comments?: any[];
}

function CommentModal({
  closeModal,
  blogId,
  currentUser,
  comments,
}: props) {
  const route = useRouter();
  const userImage = currentUser.image
    ? currentUser.image
    : '/images/no-avatar.png';
  const [showEditor, setShowEditor] = useState(false);
  const form = useForm<z.infer<typeof CommentSchema>>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      owner: currentUser.id,
      blogId: blogId,
      content: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof CommentSchema>) => {
    try {
      const response = await axios.post(
        `/api/blog/${blogId}/addComment`,
        data,
      );
      console.log(response);
      toast.success('Bình luận thành công');
      form.reset();
      setShowEditor(false);
      route.refresh();
    } catch (err) {
      console.log('[CommentModal]', err);
      toast.error('Bình luận thất bại');
    }
  };

  return (
    <div
      className="flex justify-center lg:block fixed top-0 left-0 w-full h-full py-9 lg:py-0 bg-black bg-opacity-30 z-50 animate-fadeIn"
      onClick={closeModal}
    >
      <div
        className="flex flex-col relative w-[95%] md:w-[90%] lg:w-[55%] xl:w-[45%] lg:h-[100vh] px-10 py-6 lg:ml-auto bg-white rounded-2xl lg:rounded-none animate-floatRightToLeft overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <CloseButton onClick={closeModal} />

        <Heading numComments={comments?.length} />

        <div className="flex flex-row gap-4 my-12 w-full">
          <div className="flex justify-center items-center w-[50px] h-[50px] rounded-full overflow-hidden shrink-0">
            <Image
              src={userImage}
              alt=""
              width={40}
              height={40}
              className="object-cover w-full h-full"
            />
          </div>
          {!showEditor ? (
            <div
              className="w-full text-gray-400 border-b hover:cursor-text"
              onClick={() => setShowEditor(true)}
            >
              Comment something...
            </div>
          ) : (
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-[90%]"
            >
              <Controller
                name="content"
                control={form.control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Editor
                    value={field.value}
                    onChange={field.onChange}
                    height={200}
                    className={
                      form.formState.errors.content
                        ? styles['error-editor']
                        : ''
                    }
                  />
                )}
              />
              <p className="text-sm text-red-500 mt-2">
                {form.formState.errors.content?.message}
              </p>
              <div className="flex items-center gap-4 mt-4">
                <button
                  type="button"
                  onClick={() => setShowEditor(false)}
                >
                  Cancel
                </button>
                <div className="flex items-center gap-2">
                  <button
                    type="submit"
                    className="rounded-full bg-orange-300 hover:bg-orange-400 active:bg-orange-500 px-4 py-2 text-white font-semibold"
                    disabled={form.formState.isSubmitting}
                  >
                    <div>Comment</div>
                  </button>
                  {form.formState.isSubmitting && (
                    <Loader className="animate-spin w-[16px] text-slate-300" />
                  )}
                </div>
              </div>
            </form>
          )}
        </div>

        <div className="flex flex-col gap-4">
          {comments?.map((comment, index) => {
            let isLiked = false;

            for (const like of comment.Like) {
              if (like.userId === currentUser.id) {
                isLiked = true;
                break;
              }
            }

            return (
              <CommentItem
                key={index}
                commentId={comment.id}
                content={comment.content}
                commentOwner={comment.user}
                createdAt={comment.createdAt}
                updatedAt={comment.updatedAt}
                isLiked={isLiked}
                currentUserId={currentUser.id}
                numLikes={comment.Like.length}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CommentModal;
