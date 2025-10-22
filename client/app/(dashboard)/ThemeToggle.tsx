import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';
import styles from '../../assets/css/ThemeToggle.module.css';
import { useDashboardContext } from '../../context/DashboardContext';

export default function ThemeToggle(params) {
  const { isDarkTheme, toggleDarkTheme } = useDashboardContext();

  return (
    <button className={styles['theme-toggle']} onClick={toggleDarkTheme}>
      {isDarkTheme ? (
        <BsFillSunFill className={styles['toggle-icon']} data-testid="sun-fill" />
      ) : (
        <BsFillMoonFill data-testid="moon-fill" />
      )}
    </button>
  );
}
