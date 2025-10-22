'use client';

import { getQueryClient } from '@/app/providers';
import styles from '@/assets/css/DashboardForm.module.css';
import FormRow from '@/components/FormRow';
import FormRowSelect from '@/components/FormRowSelect';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FormEvent } from 'react';
import { JOB_SORT_BY, JOB_STATUS, JOB_TYPE } from '../../../../utils/constants';

export default function SearchForm() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  const jobStatus = searchParams.get('jobStatus') || 'all';
  const jobType = searchParams.get('jobType') || 'all';
  const sort = searchParams.get('sort') || 'all';
  const router = useRouter();
  const pathname = usePathname();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const queryClient = getQueryClient();
    queryClient.invalidateQueries({ queryKey: ['jobs'] });
    const params = new URLSearchParams();

    const formData = new FormData(e.currentTarget);
    const search = formData.get('search') as string;
    const jobStatus = formData.get('jobStatus') as string;
    params.set('search', search);
    params.set('jobStatus', jobStatus);

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <section className={styles.section}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h5 className={styles['form-title']}>search form</h5>
        <div className={styles['form-center']}>
          <FormRow
            type="search"
            name="search"
            defaultValue={search}
            // onChange={debounce((form) => {
            //   submit(form);
            // })}
          />

          <FormRowSelect
            labelText="job status"
            name="jobStatus"
            list={['all', ...Object.values(JOB_STATUS)]}
            defaultValue={jobStatus}
          />
          <FormRowSelect
            labelText="job type"
            name="jobType"
            list={['all', ...Object.values(JOB_TYPE)]}
            defaultValue={jobType}
          />
          <FormRowSelect name="sort" defaultValue={sort} list={[...Object.values(JOB_SORT_BY)]} />
          <button type="submit" className={`btn ${styles['form-btn']} delete-btn`}>
            Search
          </button>

          <Link href="/all-jobs" className={`btn ${styles['form-btn']} delete-btn`}>
            Reset Form
          </Link>
        </div>
      </form>
    </section>
  );
}
