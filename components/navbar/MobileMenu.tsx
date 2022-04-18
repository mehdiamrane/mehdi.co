import { Box, Center, Flex, Button, IconButton, SimpleGrid, useBoolean, useColorModeValue as mode } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React from 'react';
import FocusLock from 'react-focus-lock';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import NavLink from 'components/navbar/NavLink';
import Logo from 'components/navbar/Logo';
import links from 'data/nav-links';
import useTranslation from 'hooks/useTranslation';

const variants = {
  show: {
    display: 'revert',
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  hide: {
    opacity: 0,
    scale: 0.98,
    transition: {
      duration: 0.1,
      ease: 'easeIn',
    },
    transitionEnd: {
      display: 'none',
    },
  },
};

const Transition = ({ in: inProp, children }: { in: boolean; children: React.ReactNode }) => {
  return (
    <motion.div
      initial={false}
      variants={variants}
      animate={inProp ? 'show' : 'hide'}
      style={{
        transformOrigin: 'top right',
        position: 'absolute',
        width: 'calc(100% - 32px)',
        top: '16px',
        left: '16px',
        margin: '0 auto',
        zIndex: 1,
      }}
    >
      {children}
    </motion.div>
  );
};

const MobileMenu = ({ currentPath }: { currentPath: string }) => {
  const { t } = useTranslation('common');

  const [show, { toggle, off }] = useBoolean();
  const ref = React.useRef(null);

  return (
    <>
      <IconButton
        aria-label='Menu'
        variant='solid'
        colorScheme='gray'
        icon={<HiOutlineMenu />}
        onClick={toggle}
        size='sm'
        outline={0}
        fontSize='md'
        display={{
          base: 'flex',
          sm: 'none',
        }}
      />

      <Button
        variant='solid'
        colorScheme='gray'
        leftIcon={<HiOutlineMenu />}
        onClick={toggle}
        size='sm'
        outline={0}
        fontSize='md'
        display={{
          base: 'none',
          sm: 'flex',
          md: 'none',
        }}
      >
        {t('nav.menu')}
      </Button>

      <Transition in={show}>
        <FocusLock disabled={!show} returnFocus>
          <Box shadow='lg' rounded='lg'>
            <Box
              border='2px solid'
              borderColor={mode('gray.200', 'dark.500')}
              bg={mode('gray.50', 'dark.800')}
              rounded='lg'
              ref={ref}
              tabIndex={0}
              outline={0}
            >
              <Box pt='5' pb='6' px='5'>
                <Flex justify='space-between' align='center'>
                  <Logo onClick={toggle} />
                  <Box mr='-2' mt='-2'>
                    <Center
                      as='button'
                      type='button'
                      onClick={off}
                      rounded='base'
                      p='1'
                      color={mode('gray.600', 'gray.400')}
                      _hover={{
                        bg: mode('gray.200', 'dark.400'),
                      }}
                    >
                      <Box srOnly>{t('nav.menu_close')}</Box>
                      <HiOutlineX aria-hidden fontSize='1.5rem' />
                    </Center>
                  </Box>
                </Flex>
                <SimpleGrid
                  gap='6'
                  mt='8'
                  columns={{
                    base: 1,
                    sm: 2,
                  }}
                >
                  {links.map((link) => (
                    <NavLink.Mobile
                      key={link.key}
                      href={link.href}
                      leftIcon={link.icon}
                      title={t(`nav.${link.key}`)}
                      currentPath={currentPath}
                      onClick={toggle}
                    />
                  ))}
                </SimpleGrid>
              </Box>
            </Box>
          </Box>
        </FocusLock>
      </Transition>
    </>
  );
};

export default MobileMenu;
