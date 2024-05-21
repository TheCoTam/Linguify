'use client';

import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';

import TitleInput from '@/components/Blog/CreateBlog/TitleInput';
import ContentInput from '@/components/Blog/CreateBlog/ContentInput';
import { NewBlogSchema } from '@/schemas';

const CreateBlog = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof NewBlogSchema>>({
    resolver: zodResolver(NewBlogSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof NewBlogSchema>) => {
    try {
      const response = await axios.post(
        '/api/blog/createNewBlog',
        data,
      );
      console.log(response);
      toast.success('Blog posted');
      router.push('/blog?page=1');
    } catch (error) {
      console.log('[CreateBlog]', error);
      toast.error('Something went wrong');
    }
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
          />
          <button
            className="w-max px-3 py-2 bg-orange-200 hover:bg-orange-300 active:bg-orange-400 border-[3px] border-dashed rounded-2xl border-slate-400 hover:border-slate-500 active:border-slate-600"
            disabled={form.formState.isSubmitting}
          >
            Publish
          </button>
        </div>
        <ContentInput
          name="content"
          control={form.control}
          errorMessage={form.formState.errors.content?.message}
        />
      </form>
    </div>
  );
};

export default CreateBlog;
