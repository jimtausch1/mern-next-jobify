'use client';

import { FaAlignLeft } from 'react-icons/fa';
import Wrapper from '../../assets/wrappers/Navbar';
import Logo from '../../components/Logo';
import { useDashboardContext } from '../../context/DashboardContext';
import LogoutContainer from './LogoutContainer';
import ThemeToggle from './ThemeToggle';

export default function Navbar(params) {
  const { toggleSidebar } = useDashboardContext();
  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h4 className="logo-text">dashboard</h4>
        </div>
        <div className="btn-container">
          <ThemeToggle />
          <LogoutContainer />
        </div>
      </div>
    </Wrapper>
  );
}
