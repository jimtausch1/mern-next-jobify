import styles from '../../assets/css/Dashboard.module.css';
import DashboardProvider from '../../context/DashboardProvider';
import BigSidebar from './BigSidebar';
import Navbar from './Navbar';
import SmallSidebar from './SmallSidebar';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardProvider>
      <section className={styles.section}>
        <main className={styles.dashboard}>
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className={styles['dashboard-page']}>{children}</div>
          </div>
        </main>
      </section>
    </DashboardProvider>
  );
}
