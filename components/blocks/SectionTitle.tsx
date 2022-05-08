import React, { FC } from 'react';
import { IoArrowForwardSharp } from 'react-icons/io5';
import Button from 'components/shared/Button';
import Link from 'components/shared/Link';
import s from './SectionTitle.module.scss';
import useTranslation from 'hooks/useTranslation';

type SectionTitleProps = {
  title: string;
  subtitle?: string;
  moreHref?: string;
};

const SectionTitle: FC<SectionTitleProps> = ({ title, subtitle, moreHref }) => {
  const { t } = useTranslation('common');

  return (
    <div className={s.sectiontitle}>
      <div>
        <h2 className={s.sectiontitle__title}>{title}</h2>
        {subtitle ? <p className={s.sectiontitle__subtitle}>{subtitle}</p> : null}
      </div>
      {moreHref ? (
        <Link bare href={moreHref}>
          <Button size='small' variant='secondary' rightIcon={IoArrowForwardSharp}>
            {t('misc.more')}
          </Button>
        </Link>
      ) : null}
    </div>
  );
};

export default SectionTitle;
