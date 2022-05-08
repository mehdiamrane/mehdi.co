import React from 'react';
import { Box, Flex, Text, useColorModeValue as mode } from '@chakra-ui/react';

const Footer = () => {
  const footerHeight = 20;
  const year: number = new Date().getFullYear();

  return (
    <>
      <Box h={footerHeight} position='relative' zIndex={-1} />
      <Box
        as='footer'
        w='full'
        maxH={footerHeight}
        h={footerHeight}
        bgGradient={mode('linear(to-t, white, gray.200)', 'linear(to-t, dark.900, dark.600)')}
        pos='fixed'
        bottom={0}
      >
        <Flex align='center' justify='space-between' flexDir='row' w='full' h='full' maxW='6xl' p={6} mx='auto'>
          <Box>
            <Text fontSize='sm' color={mode('gray.600', 'gray.500')}>
              &copy; 2020 - {year} Mehdi Amrane
            </Text>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Footer;
