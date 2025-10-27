'use client';

import { getQueryClient } from '@/app/providers';
import FormRow from '@/components/FormRow';
import FormRowSelect from '@/components/FormRowSelect';
import SubmitBtn from '@/components/SubmitBtn';
import { useDashboardContext } from '@/context/DashboardContext';
import { customFetch } from '@/utils';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { JOB_STATUS, JOB_TYPE } from '../../../../utils/constants';
import styles from '../../../assets/css/DashboardForm.module.css';

export default function CreateJobForm() {
  const { user } = useDashboardContext();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateEditJobType>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<CreateEditJobType> = async (data) => {
    alert(JSON.stringify(data));
    const queryClient = getQueryClient();
    try {
      await customFetch.post('/jobs', data);
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      toast.success('Job added successfully ');
      return router.push('all-jobs');
    } catch (error: any) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

  return (
    <section className={styles.section}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h4 className={styles['form-title']}>add job</h4>
        <div className={styles['form-center']}>
          <FormRow
            type="text"
            name="position"
            error={errors.position}
            {...register('position', {
              required: { value: true, message: 'Field is required' },
              minLength: { value: 3, message: 'Must be at least 3 characters' },
            })}
          />
          <FormRow
            type="text"
            name="company"
            error={errors.company}
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
            defaultValue={user.location}
            {...register('jobLocation', {
              required: { value: true, message: 'Field is required' },
              minLength: { value: 3, message: 'Must be at least 3 characters' },
            })}
          />
          <FormRowSelect
            labelText="job status"
            name="jobStatus"
            defaultValue={JOB_STATUS.PENDING}
            list={Object.values(JOB_STATUS)}
            {...register('jobStatus')}
          />
          <FormRowSelect
            labelText="job type"
            name="jobType"
            defaultValue={JOB_TYPE.FULL_TIME}
            list={Object.values(JOB_TYPE)}
            {...register('jobType')}
          />
          <SubmitBtn formBtn />
        </div>
      </form>
    </section>
  );
}
