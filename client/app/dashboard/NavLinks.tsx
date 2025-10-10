import NavLink from '../../components/NavLink';
import { useDashboardContext } from '../../context/DashboardContext';
import { links } from '../../utils';

type NavLinksProps = {
  isBigSidebar?: boolean;
};

export default function NavLinks({ isBigSidebar }: NavLinksProps) {
  const { toggleSidebar, user } = useDashboardContext();

  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, icon } = link;
        const { role } = user;
        if (path === 'admin' && role !== 'admin') return;
        return (
          <NavLink
            href={path}
            key={text}
            exact
            className="nav-link"
            activeClassName="nav-link"
            onClick={isBigSidebar ? () => {} : toggleSidebar}
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
}
