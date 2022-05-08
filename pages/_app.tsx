import React from 'react';

import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import NavBar from 'components/navbar/NavBar';
import Footer from 'components/layout/Footer';
import 'styles/globals.scss';

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <NavBar router={router} />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default appWithTranslation(MyApp);
