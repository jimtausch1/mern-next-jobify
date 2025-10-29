import styles from '@/assets/css/StatItem.module.css';

type StatItemProps = {
  count: number | string;
  title: string;
  icon: React.ReactNode;
  color: string;
  bcg: string;
};

export default function StatItem({ count, title, icon, color, bcg }: StatItemProps) {
  return (
    // <Wrapper color={color} bcg={bcg}>
    <article className={styles.article}>
      <header>
        <span className={styles.count}>{count}</span>
        <span className={styles.icon}>{icon}</span>
      </header>
      <h5 className={styles.title}>{title}</h5>
    </article>
    // </Wrapper>
  );
}
