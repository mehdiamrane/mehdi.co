import React, { forwardRef } from 'react';
import NextLink from 'next/link';

import s from './Link.module.scss';
import clsx from 'clsx';

type LinkProps = {
  href: string;
  bare?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  children?: React.ReactNode;
};

const Link = forwardRef<HTMLAnchorElement, LinkProps>(({ href, bare, onClick, children, ...rest }, ref) => {
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

  if (isInternalLink) {
    return (
      <NextLink href={href} passHref scroll={false}>
        <a ref={ref} className={clsx(bare && s['link--bare'])} onClick={onClick} {...rest}>
          {children}
        </a>
      </NextLink>
    );
  }

  return (
    <a ref={ref} target='_blank' className={clsx(bare && s['link--bare'])} onClick={onClick} {...rest}>
      {children}
    </a>
  );
});

Link.displayName = 'Link';
export default Link;
