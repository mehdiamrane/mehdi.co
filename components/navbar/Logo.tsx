import React from 'react';
import Link from 'components/shared/Link';
import s from './Logo.module.scss';

type LogoProps = {
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};
const Logo = ({ onClick }: LogoProps) => (
  <Link href='/' bare onClick={onClick}>
    <div className={s.logo}>
      <div className={s.logo__text}>
        <span>mehdi</span>
      </div>
      <span className={s.logo__underscore}>_</span>
    </div>
  </Link>
);

export default Logo;
