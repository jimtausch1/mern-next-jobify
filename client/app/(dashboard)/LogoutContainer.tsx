'use client';

import { useState } from 'react';
import { FaCaretDown, FaUserCircle } from 'react-icons/fa';
import styles from '../../assets/css/LogoutContainer.module.css';
import { useDashboardContext } from '../../context/DashboardContext';

export default function LogoutContainer(params) {
  const [showLogout, setShowLogout] = useState(false);
  const { user, logoutUser } = useDashboardContext();

  const showDropdown = showLogout
    ? `${styles.dropdown} ${styles['show-dropdown']}`
    : `${styles.dropdown}`;

  return (
    <div className={styles.logout}>
      <button
        type="button"
        className={`btn ${styles['logout-btn']}`}
        onClick={() => setShowLogout(!showLogout)}
      >
        {user?.avatar ? (
          <img src={user.avatar} alt="avatar" className={styles.img} />
        ) : (
          <FaUserCircle />
        )}
        {user?.name}
        <FaCaretDown />
      </button>
      <div className={showDropdown}>
        <button type="button" className={`${styles['dropdown-btn']}`} onClick={logoutUser}>
          logout
        </button>
      </div>
    </div>
  );
}
