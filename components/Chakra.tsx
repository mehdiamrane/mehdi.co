import React from 'react';
import { ChakraProvider, cookieStorageManager, localStorageManager } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import theme from 'styles/theme';

export function Chakra({ cookies, children }: { cookies: string; children: React.ReactNode }) {
  const colorModeManager = typeof cookies === 'string' ? cookieStorageManager(cookies) : localStorageManager;

  return (
    <ChakraProvider colorModeManager={colorModeManager} theme={theme} resetCSS>
      {children}
    </ChakraProvider>
  );
}

// also export a reusable function getServerSideProps
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  return {
    props: {
      // first time users will not have any cookies and you may not return
      // undefined here, hence ?? is necessary
      cookies: req.headers.cookie ?? '',
    },
  };
};
