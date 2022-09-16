import React from 'react';
import NavLink from 'components/navbar/NavLink';
import useScrollPosition from 'hooks/useScrollPosition';
import Logo from 'components/navbar/Logo';
import ColorModeSwitch from 'components/navbar/ColorModeSwitch';
import links from 'data/nav-links';
import type { AppProps } from 'next/app';
import useTranslation from 'hooks/useTranslation';

import { containerProps } from 'styles/theme';
import { Box, Flex } from '@chakra-ui/react';

const NavBar = ({ router }: { router: AppProps['router'] }) => {
  const { t } = useTranslation('common');
  const { isAtTop } = useScrollPosition();

  return (
    <Box
      as='header'
      position='fixed'
      top={0}
      left={0}
      w='full'
      zIndex='docked'
      backdropFilter={isAtTop ? 'saturate(100%) blur(0px)' : 'saturate(180%) blur(5px)'}
      bgColor={isAtTop ? 'transparent' : 'whiteAlpha.700'}
      borderBottom={isAtTop ? '0px solid' : '2px solid'}
      borderColor='gray.100'
      transition='all 150ms ease'
    >
      <Flex {...containerProps} as='nav' py={0} h={16} justify='space-between' align='center'>
        <Logo />
        <Flex align='center' direction='row' gap={1} justify='center'>
          {links.map((link) => (
            <NavLink.Desktop
              key={link.key}
              title={t(`nav.${link.key}`)}
              href={link.href}
              leftIcon={link.icon}
              currentPath={router.asPath}
            />
          ))}
          <ColorModeSwitch ml={{ base: 2, md: 4 }} />
        </Flex>
      </Flex>
    </Box>
  );
};

export default NavBar;
