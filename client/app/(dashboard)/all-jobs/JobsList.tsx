'use client';

import PageBtnContainer from '@/components/PageBtnContainer';
import { useAllJobsContext } from '@/context/AllJobsContext';
import styles from '../../../assets/css/JobsList.module.css';
import Job from './Job';

export default function JobsList() {
  const { data, isLoading } = useAllJobsContext();

  if (isLoading) {
    return (
      <section className={styles.section}>
        <h5>Loading...</h5>
      </section>
    );
  }

  const { jobs, totalJobs, numOfPages } = data;
  if (jobs && jobs.length === 0) {
    return (
      <section className={styles.section}>
        <h5>No jobs to display...</h5>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <h5>
        {totalJobs} job{jobs && jobs.length > 1 && 's'} found
      </h5>
      <div className={styles.jobs}>
        {jobs &&
          jobs.map((job: JobModel) => {
            return <Job key={job._id} {...job} />;
          })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </section>
  );
}
