import React from 'react';

import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import NavBar from 'components/navbar/NavBar';
import Footer from 'components/layout/Footer';
import 'styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'styles/theme';

function MyApp({ Component, pageProps, router }: AppProps) {
  const isAppMode = router.route.startsWith('/notes');

  return (
    <ChakraProvider theme={theme} resetCSS>
      <NavBar router={router} isAppMode={isAppMode} />
      <Component {...pageProps} />
      <Footer isHidden={isAppMode} />
    </ChakraProvider>
  );
}

export default appWithTranslation(MyApp);
