import React, { FC } from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import PageHero from 'components/blocks/PageHero';
import PostsList from 'components/posts/PostsList';
import useTranslation from 'hooks/useTranslation';
import { Box, useColorModeValue as mode } from '@chakra-ui/react';
import theme, { containerProps } from 'styles/theme';
import { getAllNotesContent } from 'utils/mdxUtils';

type ContactPageProps = {
  notes: Note[];
};

const ContactPage: FC<ContactPageProps> = ({ notes }) => {
  const { t } = useTranslation('notes');

  return (
    <>
      <Head>
        <title>{t('meta.title')}</title>
        <meta name='description' content={t('notes.description')} />
      </Head>

      <Box mt={16} mb={20} w='full' as='main'>
        <Box
          bgImage={`linear-gradient(to bottom, ${mode(
            theme.colors.white,
            theme.colors.dark[900],
          )}, ${mode(theme.colors.gray[200], theme.colors.dark[400])})`}
          borderBottom='2px solid'
          borderColor={mode('gray.300', 'dark.800')}
        >
          <PageHero
            title={t('notes.title')}
            subtitle={t('notes.subtitle')}
            description={t('notes.description')}
            image={{ src: '/images/illustrations/pencil.png', alt: 'Pencil Illustration' }}
          />
        </Box>

        <Box {...containerProps} pt={{ base: 16, md: 20 }}>
          <PostsList posts={notes} />
        </Box>
      </Box>
    </>
  );
};

export default ContactPage;

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  const notes = getAllNotesContent(locale);
  return {
    props: {
      notes,
      ...(await serverSideTranslations(locale, ['common', 'notes'])),
    },
  };
};
