import React, { FC } from 'react';
import s from './PostsList.module.scss';
import PostItem from './PostItem';
import posts from 'data/posts';

const PostsList: FC = () => {
  return (
    <div className={s.postslist}>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostsList;
