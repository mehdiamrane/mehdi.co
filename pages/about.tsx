import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import HomeHero from 'components/blocks/HomeHero';

import useTranslation from 'hooks/useTranslation';
import { Box, useColorModeValue as mode, SimpleGrid } from '@chakra-ui/react';
import theme, { containerProps } from 'styles/theme';

import SpotifyPlayer from 'components/about/SpotifyPlayer';

const AboutPage: NextPage = () => {
  const { t } = useTranslation('about');

  const [tracks, setTracks] = useState<SpotifyApi.SavedTrackObject[]>();

  useEffect(() => {
    fetch('/api/spotify/liked-tracks', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        setTracks(data.tracks);
      })
      .catch((e) => {
        // TODO: handle errors

        alert(e);
      });
  }, []);

  return (
    <>
      <Head>
        <title>{t('meta.title')}</title>
        <meta name='description' content={t('hero.body')} />
      </Head>

      <Box w='full' as='main' pb={20}>
        <Box
          bgImage={`linear-gradient(to bottom, ${mode(
            theme.colors.white,
            theme.colors.dark[900],
          )}, ${mode(theme.colors.gray[200], theme.colors.dark[400])})`}
          borderBottom='2px solid'
          borderColor={mode('gray.300', 'dark.800')}
        >
          <HomeHero />
        </Box>

        <Box
          as='section'
          id='music'
          {...containerProps}
          pt={{ base: 8, md: 14 }}
          pb={{ base: 16, md: 28 }}
        >
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} pt={4}>
            <SpotifyPlayer tracks={tracks} />
            <Box rounded='3xl' bg='gray.200' />
          </SimpleGrid>
          {/* <Box
            mt={8}
            rounded='3xl'
            overflow='hidden'
            as='iframe'
            h='lg'
            w='full'
            className='appweb'
            title='appweb'
            src='https://web.mapstr.com/?user=nbaQBWoPb3'
          /> */}
        </Box>
      </Box>
    </>
  );
};

export default AboutPage;

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'home', 'about'])),
    },
  };
};
