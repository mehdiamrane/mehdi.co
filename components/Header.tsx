import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import LangSelect from 'components/LangSelect';
const Header = () => {
  // ...
  const router = useRouter();
  // If no argument is passed, it will use `common.json`
  const { t } = useTranslation();

  return (
    <header>
      <nav>
        <Link href='/'>
          <a className={router.asPath === '/' ? 'active' : ''}>{t('home')}</a>
        </Link>
        <Link href='/about'>
          <a className={router.asPath === '/about' ? 'active' : ''}>{t('about')}</a>
        </Link>
        <LangSelect />
      </nav>
      {/* Other code */}
    </header>
  );
};

export default Header;
