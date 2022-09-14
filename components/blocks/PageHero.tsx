import React, { FC } from 'react';
import s from './PageHero.module.scss';

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
    <div className={s.pagehero}>
      <div className={s.pagehero__body}>
        <h1 className={s.pagehero__heading}>{title}</h1>
        <h2 className={s.pagehero__subtitle}>{subtitle}</h2>
        <p className={s.pagehero__description}>{description}</p>
      </div>
      <img className={s.pagehero__image} src={image.src} alt={image.alt} />
    </div>
  );
};

export default PageHero;
