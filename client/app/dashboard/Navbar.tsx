'use client';

import { FaAlignLeft } from 'react-icons/fa';
import styles from '../../assets/css/Navbar.module.css';
import Logo from '../../components/Logo';
import { useDashboardContext } from '../../context/DashboardContext';
import LogoutContainer from './LogoutContainer';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const { toggleSidebar } = useDashboardContext();
  return (
    <nav className={styles.navbar}>
      <div className={styles['nav-center']}>
        <button type="button" className={styles['toggle-btn']} onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo className={styles.logo} />
          <h4 className={styles['logo-text']}>dashboard</h4>
        </div>
        <div className={styles['btn-container']}>
          <ThemeToggle />
          <LogoutContainer />
        </div>
      </div>
    </nav>
  );
}
