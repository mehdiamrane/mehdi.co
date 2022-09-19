import React from 'react';

import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import NavBar from 'components/navbar/NavBar';
import Footer from 'components/layout/Footer';
import 'styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'styles/theme';

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <NavBar router={router} />
      <Component {...pageProps} />
      <Footer />
    </ChakraProvider>
  );
}

export default appWithTranslation(MyApp);
