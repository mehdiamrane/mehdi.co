import React from 'react';

import LocaleSwitch from 'components/shared/LocaleSwitch';

import { containerProps } from 'styles/theme';
import theme from 'styles/theme';
import { Box, Flex, Text } from '@chakra-ui/react';

const Footer = () => {
  const year: number = new Date().getFullYear();

  return (
    <Box
      as='footer'
      bgImage={`linear-gradient(to top, ${theme.colors.white}, ${theme.colors.gray[300]})`}
      bottom={0}
      h={20}
      maxH={20}
      position='fixed'
      w='full'
      zIndex='hide'
    >
      <Flex align='center' justify='space-between' direction='row' h='full' {...containerProps}>
        <Text as='span' fontSize='sm' color='gray.700'>
          &copy; 2020 - {year} Mehdi Amrane
        </Text>
        <Box mr={-1}>
          <LocaleSwitch />
        </Box>
      </Flex>
    </Box>
  );
};

export default Footer;
