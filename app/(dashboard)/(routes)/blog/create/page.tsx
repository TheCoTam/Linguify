'use client';

import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import TitleInput from '@/components/Blog/CreateBlog/TitleInput';
import ContentInput from '@/components/Blog/CreateBlog/ContentInput';
import { NewBlogSchema } from '@/schemas';

const CreateBlog = () => {
  const router = useRouter();
  const [isDisabled, setIsDisabled] = useState(false);
  const form = useForm<z.infer<typeof NewBlogSchema>>({
    resolver: zodResolver(NewBlogSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const onSubmit = (data: z.infer<typeof NewBlogSchema>) => {
    setIsDisabled(true);
    toast.loading('Posting blog...');
    axios
      .post('/api/blog/createNewBlog', data)
      .then(() => {
        toast.dismiss();
        toast.success('Blog posted');
        router.push('/blog?page=1');
      })
      .catch((error) => {
        console.log('[CreateBlog]', error);
        toast.dismiss();
        toast.error('Something went wrong');
      });
  };

  return (
    <div className="flex justify-center items-center px-10 py-7">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3 w-[80%]"
      >
        <div className="flex flex-row justify-between items-center">
          <TitleInput
            name="title"
            control={form.control}
            errorMessage={form.formState.errors.title?.message}
            disabled={isDisabled}
          />
          <button
            className={`w-max px-3 py-2 text-white bg-black  rounded-lg ${
              isDisabled
                ? 'cursor-not-allowed'
                : 'hover:opacity-80 active:opacity-60'
            }`}
            disabled={isDisabled}
          >
            Publish
          </button>
        </div>
        <ContentInput
          name="content"
          control={form.control}
          errorMessage={form.formState.errors.content?.message}
          disabled={isDisabled}
        />
      </form>
    </div>
  );
};

export default CreateBlog;
