import React from 'react';
import s from './Avatar.module.scss';

const Avatar = () => {
  return (
    <div className={s.avatar}>
      <img className={s.avatar__image} src='/images/avatar.png' alt='Avatar Illustration' />
    </div>
  );
};

export default Avatar;
