import React, { FC } from 'react';
import { Flex, Text, Image, useColorModeValue as mode } from '@chakra-ui/react';

type TechItem = {
  name: string;
  image: string;
};

type TechGridProps = {
  techs: TechItem[];
};

const TechGrid: FC<TechGridProps> = ({ techs }) => {
  return (
    <Flex direction='row' gap={{ base: 1, sm: 2 }} mt={6} maxW='full' flexWrap='wrap'>
      {techs.map((tech) => (
        <Flex
          key={tech.name}
          bg={mode('gray.100', 'whiteAlpha.100')}
          rounded={{ base: 'md', sm: 'lg' }}
          border='1px solid'
          borderColor={mode('gray.300', 'whiteAlpha.300')}
          minH={{ base: 8, sm: 10 }}
          px={{ base: 2, sm: 2 }}
          py={{ base: 1, sm: 2 }}
          align='center'
          gap={{ base: 1, sm: 2 }}
        >
          <Image
            w={{ base: 4, sm: 6 }}
            h={{ base: 4, sm: 6 }}
            objectFit='contain'
            src={tech.image}
            alt={tech.name}
          />
          <Text fontSize={{ base: 'xs', sm: 'sm' }} fontWeight='medium'>
            {tech.name}
          </Text>
        </Flex>
      ))}
    </Flex>
  );
};

export default TechGrid;
