'use client';

import styles from '../../assets/css/BigSidebar.module.css';
import Logo from '../../components/Logo';
import { useDashboardContext } from '../../context/DashboardContext';
import NavLinks from './NavLinks';

export default function BigSidebar(params) {
  const { showSidebar } = useDashboardContext();

  const displaySidebar = showSidebar
    ? `${styles['sidebar-container']}`
    : `${styles['sidebar-container']} ${styles['show-sidebar']}`;

  return (
    <aside className={styles['big-sidebar']}>
      <div className={displaySidebar}>
        <div className={styles.content}>
          <header>
            <Logo />
          </header>
          <NavLinks isBigSidebar />
        </div>
      </div>
    </aside>
  );
}
