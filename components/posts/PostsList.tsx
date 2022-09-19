import React, { FC } from 'react';

import PostItem from './PostItem';
import { Flex } from '@chakra-ui/react';

type PostsListProps = {
  posts: Note[];
};

const PostsList: FC<PostsListProps> = ({ posts }) => {
  return (
    <Flex direction='column'>
      {posts.map((post) => (
        <PostItem
          key={post.slug}
          postData={{
            title: post.data.title,
            href: `/notes/${post.slug}`,
            publishedAt: post.data.publishedAt,
          }}
        />
      ))}
    </Flex>
  );
};

export default PostsList;
