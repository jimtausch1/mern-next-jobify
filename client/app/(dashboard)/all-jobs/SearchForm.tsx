'use client';

import styles from '@/assets/css/DashboardForm.module.css';
import FormRow from '@/components/FormRow';
import FormRowSelect from '@/components/FormRowSelect';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useRef } from 'react';
import { JOB_SORT_BY, JOB_STATUS, JOB_TYPE } from '../../../../utils/constants';

export default function SearchForm() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);

  const search = searchParams.get('search') || '';
  const jobStatus = searchParams.get('jobStatus') || 'all';
  const jobType = searchParams.get('jobType') || 'all';
  const sort = searchParams.get('sort') || 'newest';

  const reset = () => {
    if (formRef.current) {
      const params = new URLSearchParams();
      params.set('search', '');
      params.set('jobStatus', 'all');
      params.set('jobType', 'all');
      params.set('sort', 'newest');

      router.push(`${pathname}?${params.toString()}`);
    }
  };

  const submit = () => {
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const search = formData.get('search') as string;
      const jobStatus = formData.get('jobStatus') as string;
      const jobType = formData.get('jobType') as string;
      const sort = formData.get('sort') as string;

      const params = new URLSearchParams();
      params.set('search', search);
      params.set('jobStatus', jobStatus);
      params.set('jobType', jobType);
      params.set('sort', sort);

      router.push(`${pathname}?${params.toString()}`);
    }
  };

  return (
    <section className={styles.section}>
      <form ref={formRef} className={styles.form}>
        <div className={styles.header}>
          <h5 className={styles['form-title']}>search form</h5>
          <button type="button" onClick={reset} className={`btn ${styles['form-btn']}`}>
            Reset Form
          </button>
        </div>

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
            onChange={submit}
          />
          <FormRowSelect
            labelText="job type"
            name="jobType"
            list={['all', ...Object.values(JOB_TYPE)]}
            defaultValue={jobType}
            onChange={submit}
          />
          <FormRowSelect
            name="sort"
            defaultValue={sort}
            list={[...Object.values(JOB_SORT_BY)]}
            onChange={submit}
          />
        </div>
      </form>
    </section>
  );
}
