import React from 'react';
import type { AppProps } from 'next/app';
import { Chakra } from 'components/Chakra';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Chakra cookies={pageProps.cookies}>
      <Component {...pageProps} />
    </Chakra>
  );
}

export default MyApp;
