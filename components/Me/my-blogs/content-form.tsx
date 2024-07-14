'use client';

import { useState } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { ClipboardX, Pencil } from 'lucide-react';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Preview } from '@/components/preview';
import { Editor } from '@/components/editor';

interface BlogContentFormProps {
  initialData: {
    content: string;
  };
  blogId: string;
}

const formSchema = z.object({
  content: z.string().min(1, {
    message: 'Content is required',
  }),
});

const BlogContentForm = ({
  initialData,
  blogId,
}: BlogContentFormProps) => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    try {
      const { content } = value;
      const { content: existingTitle } = initialData;

      if (content === existingTitle) {
        toast.error('Please make a change');
        toggleEdit();
        return;
      }

      await axios.patch(`/api/blog/${blogId}`, value);
      toast.success('Blog title updated');
      toggleEdit();
      router.refresh();
    } catch {
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Blog Content
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>
              <ClipboardX className="h-4 w-4 mr-2" />
              Cancel
            </>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Content
            </>
          )}
        </Button>
      </div>
      <div>
        {!isEditing && <Preview value={initialData.content} />}
        {isEditing && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 mt-4"
            >
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Editor {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <Button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                >
                  Save
                </Button>
              </div>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
};

export default BlogContentForm;
