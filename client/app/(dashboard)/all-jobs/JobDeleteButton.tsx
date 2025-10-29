'use client';

import styles from '@/assets/css/Job.module.css';
import { customFetch } from '@/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

type JobDeleteButtonProps = {
  id: string;
};

export default function JobDeleteButton({ id }: JobDeleteButtonProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const deleteJobAction = async (id: string) => {
    try {
      await customFetch.delete(`/jobs/${id}`);
    } catch (error: any) {
      toast.error(error?.response?.data?.msg);
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteJobAction(id),
    onSuccess: () => {
      toast.success('Job deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      queryClient.invalidateQueries({ queryKey: ['charts'] });
      router.push('/all-jobs');
    },
  });
  return (
    <button
      className={`btn ${styles['delete-btn']}`}
      disabled={isPending}
      onClick={() => {
        mutate(id);
      }}
    >
      {isPending ? 'deleting...' : 'delete'}
    </button>
  );
}
