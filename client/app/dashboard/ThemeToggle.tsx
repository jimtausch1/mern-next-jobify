import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';
import Wrapper from '../../assets/wrappers/ThemeToggle';
import { useDashboardContext } from '../../context/DashboardContext';

export default function ThemeToggle(params) {
  const { isDarkTheme, toggleDarkTheme } = useDashboardContext();

  return (
    <Wrapper onClick={toggleDarkTheme}>
      {isDarkTheme ? (
        <BsFillSunFill className="toggle-icon" data-testid="sun-fill" />
      ) : (
        <BsFillMoonFill data-testid="moon-fill" />
      )}
    </Wrapper>
  );
}
