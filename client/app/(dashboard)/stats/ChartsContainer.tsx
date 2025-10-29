'use client';

import { fetchData } from '@/app/fetcher';
import styles from '@/assets/css/ChartsContainer.module.css';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import AreaChart from './AreaChart';
import BarChart from './BarChart';

export default function ChartsContainer() {
  const [barChart, setBarChart] = useState(true);

  const { data, isPending } = useQuery({
    queryKey: ['stats'],
    queryFn: fetchData,
  });

  if (isPending) {
    return <p>Loading...</p>;
  }

  const { monthlyApplications } = data;

  return (
    <section className={styles.section}>
      <h4>Monthly Applications</h4>
      <button type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? 'Area Chart' : 'Bar Chart'}
      </button>
      {barChart ? (
        <BarChart data={monthlyApplications} />
      ) : (
        <AreaChart data={monthlyApplications} />
      )}
    </section>
  );
}
