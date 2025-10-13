import { QueryClient } from '@tanstack/react-query';
import styles from '../../assets/css/Dashboard.module.css';
import DashboardProvider from '../../context/DashboardProvider';
import BigSidebar from './BigSidebar';
import Navbar from './Navbar';
import SmallSidebar from './SmallSidebar';

type DashboardPageProps = {
  queryClient: QueryClient;
};

export default function DashboardPage({ queryClient }: DashboardPageProps) {
  return (
    <DashboardProvider queryClient={queryClient}>
      <section className={styles.section}>
        <main className={styles.dashboard}>
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className={styles['dashboard-page']}></div>
          </div>
        </main>
      </section>
    </DashboardProvider>
  );
}
