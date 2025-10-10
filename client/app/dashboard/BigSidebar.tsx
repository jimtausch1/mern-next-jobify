'use client';

import Wrapper from '../../assets/wrappers/BigSidebar';
import Logo from '../../components/Logo';
import { useDashboardContext } from '../../context/DashboardContext';
import NavLinks from './NavLinks';

export default function BigSidebar(params) {
  const { showSidebar } = useDashboardContext();

  return (
    <Wrapper>
      <div className={showSidebar ? 'sidebar-container ' : 'sidebar-container show-sidebar'}>
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks isBigSidebar />
        </div>
      </div>
    </Wrapper>
  );
}
