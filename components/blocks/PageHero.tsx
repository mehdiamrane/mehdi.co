import React, { FC } from 'react';
import { containerProps } from 'styles/theme';
import { Flex, Box, Heading, Text, useColorModeValue as mode } from '@chakra-ui/react';
import DraggableImage from 'components/shared/DraggableImage';

type PageHeroProps = {
  title: string;
  subtitle: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
};

const PageHero: FC<PageHeroProps> = ({ title, subtitle, description, image }) => {
  return (
    <Flex
      gap={8}
      align='flex-start'
      direction={{ base: 'column-reverse', md: 'row' }}
      justify={{ base: 'normal', md: 'space-between' }}
      py={{ base: 16, md: 20 }}
      {...containerProps}
    >
      <Box flexBasis='70%'>
        <Heading as='h1' variant='gradient'>
          {title}
        </Heading>
        <Heading
          as='h2'
          color={mode('gray.800', 'whiteAlpha.800')}
          fontFamily='body'
          fontSize={{ base: 'md', md: 'lg' }}
          fontWeight='normal'
        >
          {subtitle}
        </Heading>
        <Text
          color={mode('gray.900', 'whiteAlpha.900')}
          lineHeight='tall'
          mt={4}
          fontSize={{ base: 'md', md: 'lg' }}
          fontWeight='medium'
        >
          {description}
        </Text>
      </Box>
      <DraggableImage w={24} src={image.src} alt={image.alt} />
    </Flex>
  );
};

export default PageHero;
