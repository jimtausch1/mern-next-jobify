'use client';

import { getQueryClient } from '@/app/providers';
import styles from '@/assets/css/DashboardForm.module.css';
import FormRow from '@/components/FormRow';
import FormRowSelect from '@/components/FormRowSelect';
import SubmitBtn from '@/components/SubmitBtn';
import { useAllJobsContext } from '@/context/AllJobsContext';
import { customFetch } from '@/utils';
import { useMutation } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { JOB_STATUS, JOB_TYPE } from '../../../../../utils/constants';

export default function EditJobForm() {
  const { data } = useAllJobsContext();
  const params = useParams();
  const jobId = params.id.toString() || '';
  const job = data.jobs ? data.jobs.find((d) => d._id === jobId) : ({} as JobModel);

  const queryClient = getQueryClient();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateEditJobType>({ mode: 'onChange' });

  const updateJobAction = async (jobId: string, values: any) => {
    try {
      await customFetch.patch(`/jobs/${jobId}`, values);
    } catch (error: any) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateEditJobType) => updateJobAction(jobId, values),
    onSuccess: () => {
      toast.success('Job edited successfully');
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['job', jobId] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      router.push('/all-jobs');
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: CreateEditJobType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    mutate(values);
  }

  return (
    <section className={styles.section}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h4 className={styles['form-title']}>edit job</h4>
        <div className={styles['form-center']}>
          <FormRow
            type="text"
            name="position"
            error={errors.position}
            defaultValue={job.position}
            {...register('position', {
              required: { value: true, message: 'Field is required' },
              minLength: { value: 3, message: 'Must be at least 3 characters' },
            })}
          />
          <FormRow
            type="text"
            name="company"
            error={errors.company}
            defaultValue={job.company}
            {...register('company', {
              required: { value: true, message: 'Field is required' },
              minLength: { value: 3, message: 'Must be at least 3 characters' },
            })}
          />
          <FormRow
            type="text"
            labelText="job location"
            name="jobLocation"
            error={errors.jobLocation}
            defaultValue={job.jobLocation}
            {...register('jobLocation', {
              required: { value: true, message: 'Field is required' },
              minLength: { value: 3, message: 'Must be at least 3 characters' },
            })}
          />

          <FormRowSelect
            labelText="job status"
            name="jobStatus"
            defaultValue={job.jobStatus}
            list={Object.values(JOB_STATUS)}
            {...register('jobStatus')}
          />
          <FormRowSelect
            labelText="job type"
            name="jobType"
            defaultValue={job.jobType}
            list={Object.values(JOB_TYPE)}
            {...register('jobType')}
          />

          <SubmitBtn formBtn />
        </div>
      </form>
    </section>
  );
}
