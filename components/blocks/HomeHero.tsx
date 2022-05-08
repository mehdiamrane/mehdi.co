import React from 'react';
import { IoArrowForwardSharp } from 'react-icons/io5';
import Link from 'components/shared/Link';
import Avatar from './Avatar';
import Button from 'components/shared/Button';
import useTranslation from 'hooks/useTranslation';
import { Trans } from 'next-i18next';

import s from './HomeHero.module.scss';

const HomeHero = () => {
  const { t } = useTranslation('home');

  return (
    <div className={s.homehero}>
      <div className={s.homehero__body}>
        <h1 className={s.homehero__heading}>{t('hero.title')}</h1>
        <h2 className={s.homehero__subtitle}>{t('hero.subtitle')}</h2>
        <p className={s.homehero__description}>
          <Trans
            i18nKey='hero.body'
            t={t}
            components={[<Link href='/projects' bare key={0} />, <Link href='/blog' bare key={1} />, <Link href='/notes' bare key={2} />]}
          />
        </p>
        <div className={s.homehero__buttons}>
          <Link href='/projects' bare>
            <Button variant='brand' rightIcon={IoArrowForwardSharp}>
              {t('hero.primary_cta')}
            </Button>
          </Link>
          <Link href='/about' bare>
            <Button variant='secondary'>{t('hero.secondary_cta')}</Button>
          </Link>
        </div>
      </div>
      <div className={s.homehero__avatar}>
        <Avatar />
      </div>
    </div>
  );
};

export default HomeHero;
