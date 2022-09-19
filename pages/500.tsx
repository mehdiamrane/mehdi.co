import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import useTranslation from 'hooks/useTranslation';
import { Flex, Box, Heading, Button, Text, useColorModeValue as mode } from '@chakra-ui/react';
import { containerProps } from 'styles/theme';
import Link from 'components/shared/Link';

const Page500: NextPage = () => {
  const { t } = useTranslation('common');

  return (
    <div>
      <Head>
        <title>{`500 ${t('meta.partial-title')}`}</title>
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
        <Box
          w='full'
          p={8}
          rounded='lg'
          bgColor={mode('gray.100', 'dark.800')}
          border='1px solid'
          borderColor={mode('gray.300', 'dark.600')}
        >
          <Heading as='h1'>{t('500.title')}</Heading>
          <Text my={8}>{t('500.description')}</Text>
          <Link href='/' bare>
            <Button variant='glow'>{t('500.button')}</Button>
          </Link>
        </Box>
      </Flex>
    </div>
  );
};

export default Page500;

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};
