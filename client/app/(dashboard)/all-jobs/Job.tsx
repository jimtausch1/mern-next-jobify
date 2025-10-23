import styles from '@/assets/css/Job.module.css';
import day from 'dayjs';
import Link from 'next/link';
import { FaBriefcase, FaCalendarAlt, FaLocationArrow } from 'react-icons/fa';
import JobInfo from './JobInfo';

type JobProps = {
  _id: string;
  position: string;
  company: string;
  jobLocation: string;
  jobType: string;
  jobStatus: string;
  createdAt: string;
};

export default function Job({
  _id,
  position,
  company,
  jobLocation,
  jobType,
  jobStatus,
  createdAt,
}: JobProps) {
  const date = day(createdAt).format('MMM DD, YYYY');
  return (
    <article className={styles.article}>
      <header>
        <div className={styles['main-icon']}>{company.charAt(0)}</div>
        <div className={styles.info}>
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className={styles.content}>
        <div className={styles['content-center']}>
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`${styles.status} ${jobStatus}`}>{jobStatus}</div>
        </div>
        <footer className={styles.actions}>
          <Link href={`../edit-job/${_id}`} className={`btn ${styles['edit-btn']}`}>
            Edit
          </Link>
          <form method="post" action={`../delete-job/${_id}`}>
            <button type="submit" className={`btn ${styles['delete-btn']}`}>
              Delete
            </button>
          </form>
        </footer>
      </div>
    </article>
  );
}
