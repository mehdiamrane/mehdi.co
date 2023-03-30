import React, { FC } from 'react';
import { RiStarFill } from 'react-icons/ri';

import {
  Box,
  Collapse,
  Flex,
  Tag,
  TagLabel,
  TagRightIcon,
  Text,
  useColorModeValue as mode,
  useDisclosure,
} from '@chakra-ui/react';
import Link from 'components/shared/Link';

interface IStarredRepoProps {
  repo: StarredRepo;
}

const StarredRepoItem: FC<IStarredRepoProps> = ({ repo }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Link href={repo.url} bare>
      <Box
        onMouseLeave={onClose}
        onMouseEnter={onOpen}
        p={2}
        mx={0}
        bg={mode('gray.100', 'whiteAlpha.100')}
        rounded='lg'
        _hover={{ bg: mode('blackAlpha.100', 'whiteAlpha.300'), mx: -4, p: 4, shadow: 'sm' }}
        _active={{ bg: mode('blackAlpha.50', 'whiteAlpha.400') }}
        transition='all 150ms ease'
      >
        <Flex align='center' justify='space-between'>
          <Text
            fontSize='sm'
            fontWeight='semibold'
            color={mode('gray.800', 'whiteAlpha.900')}
            noOfLines={1}
          >
            <Text as='span' fontWeight='normal'>
              {repo.author}/
            </Text>
            {repo.name}
          </Text>
          <Tag
            size='sm'
            bg={mode('blackAlpha.100', 'whiteAlpha.100')}
            color={mode('blackAlpha.700', 'whiteAlpha.700')}
          >
            <TagLabel>{repo.starsCount}</TagLabel>
            <TagRightIcon ml={1} as={RiStarFill} />
          </Tag>
        </Flex>
        {repo.description && (
          <Collapse in={isOpen} animateOpacity>
            <Text mt={2} fontSize='xs' color={mode('gray.800', 'whiteAlpha.900')}>
              {repo.description}
            </Text>
          </Collapse>
        )}
      </Box>
    </Link>
  );
};

export default StarredRepoItem;
