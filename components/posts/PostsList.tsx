import React, { FC } from 'react';

import PostItem from './PostItem';
import posts from 'data/posts';
import { Flex } from '@chakra-ui/react';

const PostsList: FC = () => {
  return (
    <Flex direction='column'>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </Flex>
  );
};

export default PostsList;
