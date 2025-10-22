'use client';

import { FaTimes } from 'react-icons/fa';
import styles from '../../assets/css/SmallSidebar.module.css';
import Logo from '../../components/Logo';
import { useDashboardContext } from '../../context/DashboardContext';
import NavLinks from './NavLinks';

export default function SmallSidebar() {
  const { showSidebar, toggleSidebar } = useDashboardContext();

  const displaySidebar = showSidebar
    ? `${styles['sidebar-container']} ${styles['show-sidebar']}`
    : `${styles['sidebar-container']}`;

  return (
    <aside className={styles['small-sidebar']}>
      <div className={displaySidebar}>
        <div className={styles.content}>
          <button
            type="button"
            className={styles['close-btn']}
            data-testid="toggle-sidebar"
            onClick={toggleSidebar}
          >
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </aside>
  );
}
