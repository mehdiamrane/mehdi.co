import React from 'react';
import NavLink from 'components/navbar/NavLink';
import useScrollPosition from 'hooks/useScrollPosition';
import Logo from 'components/navbar/Logo';
import links from 'data/nav-links';
import type { AppProps } from 'next/app';
import useTranslation from 'hooks/useTranslation';

import s from './NavBar.module.scss';
import clsx from 'clsx';

const NavBar = ({ router }: { router: AppProps['router'] }) => {
  const { t } = useTranslation('common');
  const { isAtTop } = useScrollPosition();

  return (
    <header className={clsx(s.navbar, !isAtTop && s['navbar--scrolled'])}>
      <nav className={s.navbar__nav}>
        <Logo />
        <div className={s.navbar__menu}>
          {links.map((link) => (
            <NavLink.Desktop
              key={link.key}
              title={t(`nav.${link.key}`)}
              href={link.href}
              leftIcon={link.icon}
              currentPath={router.asPath}
            />
          ))}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
