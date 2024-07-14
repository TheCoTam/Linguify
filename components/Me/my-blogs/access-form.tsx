'use client';

import { useState } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { ClipboardX, Loader2, Pencil } from 'lucide-react';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from '@/components/ui/form';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Preview } from '@/components/preview';
import { Editor } from '@/components/editor';
import { Checkbox } from '@/components/ui/checkbox';

interface BlogContentFormProps {
  initialData: {
    isPublished: boolean;
  };
  blogId: string;
}

const formSchema = z.object({
  isPublished: z.boolean().default(false),
});

const BlogContentForm = ({
  initialData,
  blogId,
}: BlogContentFormProps) => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    try {
      setIsUpdating(true);

      await axios.patch(`/api/blog/${blogId}`, value);
      toast.success('Blog title updated');
      toggleEdit();
      router.refresh();
    } catch {
      toast.error('Something went wrong');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="relative mt-6 border bg-slate-100 rounded-md p-4">
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between">
        Access Control
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>
              <ClipboardX className="h-4 w-4 mr-2" />
              Cancel
            </>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Access
            </>
          )}
        </Button>
      </div>
      <div>
        {!isEditing && (
          <div className="text-sm mt-2">
            {initialData.isPublished ? (
              <>This blog is public</>
            ) : (
              <>This blog is private</>
            )}
          </div>
        )}
        {isEditing && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 mt-4"
            >
              <FormField
                control={form.control}
                name="isPublished"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormDescription>
                        Is this blog public?
                      </FormDescription>
                    </div>
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
