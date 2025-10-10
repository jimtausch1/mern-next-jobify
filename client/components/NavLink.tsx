'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  exact: boolean;
  className: string;
  activeClassName: string;
  end?: boolean;
  onClick: () => void;
};

export default function NavLink({
  href,
  exact,
  children,
  className,
  activeClassName,
  end,
  onClick,
}: NavLinkProps) {
  const pathname = usePathname();

  // Determine if the link is active
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  // Conditionally apply the activeClassName
  const classNameApplied = isActive
    ? `${className || ''} ${activeClassName || ''}`.trim()
    : className;

  return (
    <Link href={href} className={classNameApplied} onClick={onClick}>
      {children}
    </Link>
  );
}
