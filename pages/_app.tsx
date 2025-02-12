import React from 'react';

import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import NavBar from 'components/navbar/NavBar';
import Footer from 'components/layout/Footer';
import 'styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'styles/theme';
import Script from 'next/script';

function MyApp({ Component, pageProps, router }: AppProps) {
  const isAppMode = router.route.startsWith('/notes');
  const enableAnalytics =
    process.env.NODE_ENV === 'production' &&
    process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID &&
    process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL;

  return (
    <ChakraProvider theme={theme} resetCSS>
      {enableAnalytics && (
        <Script
          defer
          src={process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL}
          data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
        />
      )}
      <NavBar router={router} isAppMode={isAppMode} />
      <Component {...pageProps} />
      <Footer isHidden={isAppMode} />
    </ChakraProvider>
  );
}

export default appWithTranslation(MyApp);
