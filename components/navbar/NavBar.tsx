import React from 'react';
import { Box, Flex, useColorModeValue as mode, Stack } from '@chakra-ui/react';
import NavLink from 'components/navbar/NavLink';
import ColorModeSwitch from 'components/navbar/ColorModeSwitch';
import SoundSwitch from 'components/navbar/SoundSwitch';
import LocaleSwitch from 'components/navbar/LocaleSwitch';
import useScrollPosition from 'hooks/useScrollPosition';
import Logo from 'components/navbar/Logo';
import MobileMenu from 'components/navbar/MobileMenu';
import links from 'data/nav-links';
import type { AppProps } from 'next/app';
import useTranslation from 'hooks/useTranslation';

const NavBar = ({ router }: { router: AppProps['router'] }) => {
  const { t } = useTranslation('common');
  const { isAtTop } = useScrollPosition();

  const backgroundColor = isAtTop ? mode('transparent', 'transparent') : mode('rgba(255, 255, 255, 0.7)', 'rgba(18, 18, 18, 0.7)');
  const borderBottom = isAtTop ? '0px solid' : '2px solid';
  const backdropFilter = isAtTop ? 'saturate(100%) blur(0px)' : 'saturate(180%) blur(20px)';

  return (
    <Box
      as='header'
      pos='fixed'
      top={0}
      left={0}
      w='full'
      backgroundColor={backgroundColor}
      borderBottom={borderBottom}
      borderColor={mode('gray.100', 'dark.800')}
      backdropFilter={backdropFilter}
      transition='all 200ms ease-in-out'
      zIndex={20}
    >
      <Flex as='nav' w='full' align='center' justify='space-between' h={16} px={6} maxW='6xl' mx='auto'>
        <Logo />
        <Flex align='center' justify='center'>
          <Stack display={{ base: 'none', md: 'flex' }} direction='row' spacing={2} align='center'>
            {links.map((link) => (
              <NavLink.Desktop
                key={link.key}
                title={t(`nav.${link.key}`)}
                href={link.href}
                leftIcon={link.icon}
                currentPath={router.asPath}
              />
            ))}
          </Stack>
          <MobileMenu currentPath={router.asPath} />
          <ColorModeSwitch ml={{ base: 2, md: 4 }} />
          <SoundSwitch ml={{ base: 2, md: 4 }} />
          <LocaleSwitch ml={{ base: 2, md: 4 }} />
        </Flex>
      </Flex>
    </Box>
  );
};

export default NavBar;
