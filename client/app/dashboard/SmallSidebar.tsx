'use client';

import { FaTimes } from 'react-icons/fa';
import Wrapper from '../../assets/wrappers/SmallSidebar';
import Logo from '../../components/Logo';
import { useDashboardContext } from '../../context/DashboardContext';
import NavLinks from './NavLinks';

export default function SmallSidebar(params) {
  const { showSidebar, toggleSidebar } = useDashboardContext();

  return (
    <Wrapper>
      <div className={showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'}>
        <div className="content">
          <button
            type="button"
            className="close-btn"
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
    </Wrapper>
  );
}
