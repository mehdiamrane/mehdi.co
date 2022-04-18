import React, { forwardRef } from 'react';
import NextLink from 'next/link';
import { Link } from '@chakra-ui/react';

type CustomLinkProps = {
  href: string;
  bare: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  children?: React.ReactNode;
};

const CustomLink = forwardRef<HTMLAnchorElement, CustomLinkProps>(({ href, bare, onClick, children, ...rest }, ref) => {
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

  if (isInternalLink) {
    return (
      <NextLink href={href} passHref scroll={false}>
        <Link ref={ref} _hover={bare ? { textDecoration: 'none' } : undefined} onClick={onClick} {...rest}>
          {children}
        </Link>
      </NextLink>
    );
  }

  return (
    <Link ref={ref} isExternal _hover={bare ? { textDecoration: 'none' } : undefined} onClick={onClick} {...rest}>
      {children}
    </Link>
  );
});

CustomLink.displayName = 'CustomLink';
export default CustomLink;
