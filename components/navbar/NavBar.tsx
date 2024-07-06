import React, { FC } from 'react';
import NavLink from 'components/navbar/NavLink';
import useScrollPosition from 'hooks/useScrollPosition';
import Logo from 'components/navbar/Logo';
import ColorModeSwitch from 'components/navbar/ColorModeSwitch';
import LocaleSwitch from 'components/navbar/LocaleSwitch';
import links from 'data/nav-links';
import type { AppProps } from 'next/app';
import useTranslation from 'hooks/useTranslation';

import { containerProps } from 'styles/theme';
import { Box, Flex, useColorModeValue as mode } from '@chakra-ui/react';

interface INavBarProps {
  router: AppProps['router'];
  isAppMode: boolean;
}

const NavBar: FC<INavBarProps> = ({ router, isAppMode }) => {
  const { t } = useTranslation('common');
  const { isAtTop } = useScrollPosition();

  const noteModeProps = isAppMode ? { maxW: 'full', px: 4 } : {};

  return (
    <Box
      as='header'
      position='fixed'
      top={0}
      left={0}
      w='full'
      zIndex='sticky'
      backdropFilter={
        isAtTop || isAppMode ? 'saturate(100%) blur(0px)' : 'saturate(180%) blur(5px)'
      }
      bgColor={
        isAppMode
          ? mode('white', 'dark.900')
          : isAtTop
            ? mode('transparent', 'transparent')
            : mode('whiteAlpha.700', 'blackAlpha.600')
      }
      borderBottom={isAppMode ? '2px solid' : isAtTop ? '0px solid' : '2px solid'}
      borderColor={mode('gray.100', 'blackAlpha.800')}
      transition='all 150ms ease'
    >
      <Flex
        {...containerProps}
        as='nav'
        h={16}
        justify='space-between'
        align='center'
        {...noteModeProps}
      >
        <Logo />
        <Flex align='center' direction='row' gap={1} justify='center'>
          {links.map((link) => (
            <NavLink.Desktop
              key={link.key}
              title={t(`nav.${link.key}`)}
              href={link.href}
              leftIcon={link.icon}
              currentPath={router.route}
            />
          ))}
          <ColorModeSwitch />
          <LocaleSwitch />
        </Flex>
      </Flex>
    </Box>
  );
};

export default NavBar;
