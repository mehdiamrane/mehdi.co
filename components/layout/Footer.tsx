import React from 'react';

import { containerProps } from 'styles/theme';
import theme from 'styles/theme';
import { Box, Flex, Text, Button, useColorModeValue as mode } from '@chakra-ui/react';
import Link from 'components/shared/Link';

const Footer = () => {
  const year: number = new Date().getFullYear();

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
        </Box>
      </Flex>
    </Box>
  );
};

export default Footer;
