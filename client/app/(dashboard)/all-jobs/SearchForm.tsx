'use client';

import styles from '@/assets/css/DashboardForm.module.css';
import FormRow from '@/components/FormRow';
import FormRowSelect from '@/components/FormRowSelect';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { JOB_SORT_BY, JOB_STATUS, JOB_TYPE } from '../../../../utils/constants';

export default function SearchForm() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { register, handleSubmit, reset } = useForm<SearchParams>({ mode: 'onChange' });

  const search = searchParams.get('search') || '';
  const jobStatus = searchParams.get('jobStatus') || 'all';
  const jobType = searchParams.get('jobType') || 'all';
  const sort = searchParams.get('sort') || 'newest';

  const onResetForm: SubmitHandler<SearchParams> = async (data) => {
    const params = new URLSearchParams();
    params.set('search', '');
    params.set('jobStatus', 'all');
    params.set('jobType', 'all');
    params.set('sort', 'newest');
    reset();

    router.push(`${pathname}?${params.toString()}`);
  };

  const onSubmit: SubmitHandler<SearchParams> = async (data) => {
    const params = new URLSearchParams();
    params.set('search', data.search);
    params.set('jobStatus', data.jobStatus);
    params.set('jobType', data.jobType);
    params.set('sort', data.sort);

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <section className={styles.section}>
      <form onChange={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.header}>
          <h5 className={styles['form-title']}>search form</h5>
          <button
            type="button"
            onClick={handleSubmit(onResetForm)}
            className={`btn ${styles['form-btn']}`}
          >
            Reset Form
          </button>
        </div>

        <div className={styles['form-center']}>
          <FormRow
            type="search"
            name="search"
            defaultValue={search}
            {...register('search')}
            // onChange={debounce((form) => {
            //   submit(form);
            // })}
          />

          <FormRowSelect
            labelText="job status"
            name="jobStatus"
            list={['all', ...Object.values(JOB_STATUS)]}
            defaultValue={jobStatus}
            {...register('jobStatus')}
          />
          <FormRowSelect
            labelText="job type"
            name="jobType"
            list={['all', ...Object.values(JOB_TYPE)]}
            defaultValue={jobType}
            {...register('jobType')}
          />
          <FormRowSelect
            name="sort"
            defaultValue={sort}
            list={[...Object.values(JOB_SORT_BY)]}
            {...register('sort')}
          />
        </div>
      </form>
    </section>
  );
}
