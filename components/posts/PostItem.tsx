import React, { FC } from 'react';
import s from './PostItem.module.scss';
import Link from 'components/shared/Link';

type PostItemProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post: any;
};

const PostItem: FC<PostItemProps> = ({ post }) => {
  return (
    <Link href={post.href} bare>
      <div className={s.postitem}>
        <span className={s.postitem__title}>{post.title}</span>
        <span className={s.postitem__date}>{post.publishedAt}</span>
      </div>
    </Link>
  );
};

export default PostItem;
