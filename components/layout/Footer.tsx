import React from 'react';

import { containerProps } from 'styles/theme';
import theme from 'styles/theme';
import { Box, Flex, Text, Button, IconButton, useColorModeValue as mode } from '@chakra-ui/react';
import Link from 'components/shared/Link';
import { RiDoorLockLine } from 'react-icons/ri';

const Footer = () => {
  const year: number = new Date().getFullYear();

  const emojiCursor = `url("data:image/svg+xml;utf8, <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' style='font-size: 24px'><text y='20'>🔑</text></svg>"), auto`;

  return (
    <Box
      as='footer'
      bgImage={`linear-gradient(to top, ${mode(theme.colors.white, theme.colors.dark[900])}, ${mode(
        theme.colors.gray[100],
        theme.colors.gray[900],
      )})`}
      bottom={0}
      h={20}
      maxH={20}
      position='absolute'
      w='full'
    >
      <Flex align='center' justify='space-between' direction='row' h='full' {...containerProps}>
        <Text as='span' fontSize='sm' color='gray.500'>
          &copy; 2020 - {year} Mehdi Amrane
        </Text>
        <Box mr={-1}>
          <Link href='https://github.com/mehdiamrane/mehdi.co'>
            <Button size='sm' variant='ghost' colorScheme={mode('blackAlpha', 'gray')}>
              Source code
            </Button>
          </Link>
          <Link href='/admin'>
            <IconButton
              cursor={emojiCursor}
              aria-label='Admin'
              icon={<RiDoorLockLine />}
              size='sm'
              fontSize='xl'
              variant='ghost'
              colorScheme={mode('blackAlpha', 'gray')}
            />
          </Link>
        </Box>
      </Flex>
    </Box>
  );
};

export default Footer;
