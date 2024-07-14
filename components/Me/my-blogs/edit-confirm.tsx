'use client';

import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { ConfirmModal } from '@/components/modals/confirm-modal';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface EditBlogActionProps {
  blogId: string;
}

const EditBlogAction = ({ blogId }: EditBlogActionProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/blog/${blogId}`);
      toast.success('Blog deleted successfully');
      router.push('/myBlogs');
    } catch {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
      router.refresh();
    }
  };

  return (
    <div>
      <ConfirmModal
        description="You are about to delete this blog."
        onConfirm={onDelete}
      >
        <Button size="sm" disabled={isLoading}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default EditBlogAction;
