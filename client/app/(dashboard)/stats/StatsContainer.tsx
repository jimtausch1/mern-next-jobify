'use client';

import { fetchData } from '@/app/fetcher';
import styles from '@/assets/css/StatsContainer.module.css';
import { useQuery } from '@tanstack/react-query';
import { FaBug, FaCalendarCheck, FaSuitcaseRolling } from 'react-icons/fa';
import StatItem from './StatItem';

export default function StatsContainer() {
  const { data, isPending } = useQuery({
    queryKey: ['stats'],
    queryFn: fetchData,
  });

  if (isPending) {
    return <p>Loading...</p>;
  }

  const { defaultStats } = data;

  const stats = [
    {
      title: 'pending applications',
      count: defaultStats.pending || 0,
      icon: <FaSuitcaseRolling />,
      color: '#f59e0b',
      bcg: '#fef3c7',
    },
    {
      title: 'interviews scheduled',
      count: defaultStats.interview || 0,
      icon: <FaCalendarCheck />,
      color: '#647acb',
      bcg: '#e0e8f9',
    },
    {
      title: 'jobs declined',
      count: defaultStats.declined || 0,
      icon: <FaBug />,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
  ];
  return (
    <section className={styles.section}>
      {stats.map((item) => {
        return <StatItem key={item.title} {...item} />;
      })}
    </section>
  );
}
