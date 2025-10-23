import styles from '@/assets/css/JobInfo.module.css';

type JobInfoProps = {
  icon: React.ReactNode;
  text: string;
};

export default function JobInfo({ icon, text }: JobInfoProps) {
  return (
    <div className={styles.div}>
      <span className={styles['job-icon']}>{icon}</span>
      <span className={styles['job-text']}>{text}</span>
    </div>
  );
}
