import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import useTranslation from 'hooks/useTranslation';
import { Flex, Box, Heading, Button, Text } from '@chakra-ui/react';
import { containerProps } from 'styles/theme';
import Link from 'components/shared/Link';

const Page404: NextPage = () => {
  const { t } = useTranslation('common');

  return (
    <div>
      <Head>
        <title>{`404 ${t('meta.partial-title')}`}</title>
        <meta name='description' content={t('meta.description')} />
      </Head>

      <Flex
        {...containerProps}
        align='center'
        justify='center'
        pt={{ base: 24, md: 32 }}
        pb={{ base: 16, md: 20 }}
        minH='calc(100vh - 80px)'
      >
        <Box w='full'>
          <Heading as='h1'>{t('404.title')}</Heading>
          <Text my={8}>{t('404.description')}</Text>
          <Link href='/' bare>
            <Button variant='glow'>{t('404.button')}</Button>
          </Link>
        </Box>
      </Flex>
    </div>
  );
};

export default Page404;

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};
