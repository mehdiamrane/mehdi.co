import React, { useEffect, forwardRef } from 'react';

import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { Chakra } from 'context/Chakra';
import NavBar from 'components/navbar/NavBar';
import Footer from 'components/layout/Footer';
import 'focus-visible/dist/focus-visible';
import 'styles/globals.css';

import { motion, AnimatePresence } from 'framer-motion';
import { pageTransition } from 'styles/animations';

type PageContainerProps = {
  children: React.ReactNode;
};

const PageContainer = forwardRef<HTMLDivElement, PageContainerProps>((props, ref) => {
  const { children, ...rest } = props;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div ref={ref} {...rest}>
      {children}
    </div>
  );
});

PageContainer.displayName = 'PageContainer';

const MotionPageContainer = motion(PageContainer);

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <Chakra cookies={pageProps.cookies}>
      <NavBar router={router} />
      <AnimatePresence exitBeforeEnter>
        <MotionPageContainer key={router.route} initial='initial' animate='animate' exit='exit' variants={pageTransition}>
          <Component {...pageProps} />
          <Footer />
        </MotionPageContainer>
      </AnimatePresence>
    </Chakra>
  );
}

export default appWithTranslation(MyApp);
