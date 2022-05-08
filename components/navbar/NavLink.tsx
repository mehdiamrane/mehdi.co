import React from 'react';
import Link from 'components/shared/Link';
import { type IconType } from 'react-icons';

import s from './NavLink.module.scss';
import clsx from 'clsx';

type NavLinkProps = {
  currentPath: string;
  title: string;
  href: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  leftIcon: IconType;
};

const DesktopNavLink = ({ currentPath, title, href, leftIcon, ...props }: NavLinkProps) => {
  const isCurrent = currentPath.startsWith(href);
  const Icon = leftIcon;

  return (
    <Link href={href} bare>
      <div className={clsx(s.navlink, isCurrent && s['navlink--current'])} aria-current={isCurrent ? 'page' : undefined}>
        <Icon className={s.navlink__icon} />
        <span>{title}</span>
      </div>
    </Link>
  );
};

const NavLink = {
  Desktop: DesktopNavLink,
};

export default NavLink;
