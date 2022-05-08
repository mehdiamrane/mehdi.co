import React from 'react';

import LocaleSwitch from 'components/shared/LocaleSwitch';

import s from './Footer.module.scss';

const Footer = () => {
  const year: number = new Date().getFullYear();

  return (
    <footer className={s.footer__container}>
      <div className={s.footer__inner}>
        <span className={s.footer__copyright}>&copy; 2020 - {year} Mehdi Amrane</span>
        <div className={s.footer__localeswitch}>
          <LocaleSwitch />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
