import React from 'react';
import Link from 'components/shared/Link';
import { type IconType } from 'react-icons';

import { Button } from '@chakra-ui/react';

type NavLinkProps = {
  currentPath: string;
  title: string;
  href: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  leftIcon: IconType;
};

const DesktopNavLink = ({ currentPath, title, href, leftIcon }: NavLinkProps) => {
  const isCurrent = href === '/' ? currentPath === href : currentPath.startsWith(href);
  const Icon = leftIcon;

  return (
    <Link href={href} bare>
      <Button
        as='div'
        leftIcon={<Icon />}
        variant={isCurrent ? 'navlink-current' : 'navlink'}
        aria-current={isCurrent ? 'page' : undefined}
      >
        {title}
      </Button>
    </Link>
  );
};

const NavLink = {
  Desktop: DesktopNavLink,
};

export default NavLink;
