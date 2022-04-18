import React from 'react';
import CustomLink from 'components/shared/CustomLink';
import { Button, useColorModeValue as mode, Flex, Icon, Box } from '@chakra-ui/react';

type NavLinkProps = {
  currentPath: string;
  title: string;
  href: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  leftIcon: React.ReactNode | any;
};

const DesktopNavLink = ({ currentPath, title, href, leftIcon, ...props }: NavLinkProps) => (
  <CustomLink href={href} bare>
    <Button
      as={Flex}
      aria-current={currentPath.startsWith(href) ? 'page' : undefined}
      color={currentPath.startsWith(href) ? mode('brand.500', 'brand.500') : mode('gray.800', 'gray.200')}
      bg={currentPath.startsWith(href) ? mode('brand.50', 'rgba(253, 53, 89, 0.1)') : mode('transparent', 'transparent')}
      _hover={{
        bg: currentPath.startsWith(href) ? mode('brand.100', 'rgba(253, 53, 89, 0.2)') : mode('blackAlpha.100', 'whiteAlpha.100'),
      }}
      variant='ghost'
      size='sm'
      fontSize='md'
      {...props}
    >
      <Icon
        as={leftIcon}
        color={currentPath.startsWith(href) ? mode('brand.500', 'brand.500') : mode('gray.800', 'gray.100')}
        fontSize='md'
        mr={2}
      />
      {title}
    </Button>
  </CustomLink>
);

const MobileNavLink = ({ currentPath, leftIcon, title, href, onClick, ...props }: NavLinkProps) => (
  <CustomLink href={href} bare onClick={onClick}>
    <Flex
      m='-3'
      p='3'
      align='center'
      rounded='md'
      cursor='pointer'
      color={currentPath.startsWith(href) ? mode('brand.500', 'brand.500') : mode('gray.800', 'gray.200')}
      bg={currentPath.startsWith(href) ? mode('brand.50', 'rgba(253, 53, 89, 0.1)') : mode('transparent', 'transparent')}
      _hover={{
        bg: currentPath.startsWith(href) ? mode('brand.100', 'rgba(253, 53, 89, 0.2)') : mode('gray.200', 'dark.400'),
      }}
      {...props}
    >
      <Icon
        as={leftIcon}
        color={currentPath.startsWith(href) ? mode('brand.500', 'brand.500') : mode('gray.800', 'gray.100')}
        fontSize='xl'
      />
      <Box marginStart='3' fontWeight={600}>
        {title}
      </Box>
    </Flex>
  </CustomLink>
);

const NavLink = {
  Desktop: DesktopNavLink,
  Mobile: MobileNavLink,
};

export default NavLink;
