import React, { FC } from 'react';
import Link from 'components/shared/Link';
import { Flex, Text } from '@chakra-ui/react';

type PostItemProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post: any;
};

const PostItem: FC<PostItemProps> = ({ post }) => {
  return (
    <Link href={post.href} bare>
      <Flex
        align='center'
        bgColor='transparent'
        rounded='md'
        direction='row'
        gap={2}
        justify='space-between'
        m='0 -1rem'
        px={4}
        py={2}
        transition='all 150ms ease'
        _hover={{ bgColor: 'gray.200' }}
        _active={{ bgColor: 'gray.300' }}
      >
        <Text
          as='span'
          color='gray.900'
          fontSize={{ base: 'sm', sm: 'md', md: 'lg' }}
          fontWeight='medium'
        >
          {post.title}
        </Text>
        <Text
          as='span'
          color='gray.600'
          fontFamily='mono'
          fontSize='sm'
          fontWeight='medium'
          whiteSpace='nowrap'
        >
          {post.publishedAt}
        </Text>
      </Flex>
    </Link>
  );
};

export default PostItem;
