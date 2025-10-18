import bigStyles from '../../assets/css/BigSidebar.module.css';
import smallStyles from '../../assets/css/SmallSidebar.module.css';
import NavLink from '../../components/NavLink';
import { useDashboardContext } from '../../context/DashboardContext';
import { links } from '../../utils';

type NavLinksProps = {
  isBigSidebar?: boolean;
};

export default function NavLinks({ isBigSidebar }: NavLinksProps) {
  const { toggleSidebar, user } = useDashboardContext();
  const navlinksStyles = isBigSidebar ? bigStyles['nav-links'] : smallStyles['nav-links'];
  const navlinkStyles = isBigSidebar ? bigStyles['nav-link'] : smallStyles['nav-link'];
  const iconStyles = isBigSidebar ? bigStyles.icon : smallStyles.icon;

  return (
    <div className={navlinksStyles}>
      {links.map((link) => {
        const { text, path, icon } = link;
        if (path === 'admin' && user?.role !== 'admin') return;
        return (
          <NavLink
            href={path}
            key={text}
            exact
            className={navlinkStyles}
            activeClassName={navlinkStyles}
            onClick={isBigSidebar ? () => {} : toggleSidebar}
            end
          >
            <span className={iconStyles}>{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
}
