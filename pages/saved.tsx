import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import SectionTitle from 'components/blocks/SectionTitle';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import useTranslation from 'hooks/useTranslation';

import { Box, Stack, Button, Skeleton, useColorModeValue as mode } from '@chakra-ui/react';
import { containerProps } from 'styles/theme';
import { RiAddFill } from 'react-icons/ri';

import StarredRepoItem from 'components/saved/StarredRepoItem';

const HomePage: NextPage = () => {
  const { t } = useTranslation('saved');

  const [starredRepos, setStarredRepos] = useState<StarredRepo[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const fetchAndSetStarredRepos = () => {
    fetch(`/api/github/starred-repos?page=${page}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        setStarredRepos((prevState) => [...prevState, ...data.repos]);
        setHasMore(data.hasMore);
        setPage((prevState) => prevState + 1);
      })
      .catch((e) => {
        console.log('error', e);
        // TODO: handle errors

        alert(e);
      });
  };

  useEffect(() => {
    fetchAndSetStarredRepos();
  }, []);

  return (
    <>
      <Head>
        <title>{t('meta.title')}</title>
        <meta name='description' content={t('meta.description')} />
      </Head>

      <Box w='full' as='main' pb={20}>
        <Box
          as='section'
          id='github-stars'
          {...containerProps}
          pt={{ base: 12, md: 16 }}
          pb={{ base: 16, md: 20 }}
        >
          <SectionTitle title={t('saved.github.title')} subtitle={t('saved.github.subtitle')} />
          <Stack spacing={2}>
            {starredRepos.length !== 0
              ? starredRepos.map((repo) => <StarredRepoItem repo={repo} key={repo.id} />)
              : Array.from({ length: 10 }).map((_item, index) => (
                  <Skeleton
                    w='full'
                    h='37px'
                    rounded='lg'
                    key={index}
                    opacity={1 / index}
                    startColor={mode('gray.100', 'whiteAlpha.100')}
                    endColor={mode('gray.300', 'whiteAlpha.300')}
                  />
                ))}
          </Stack>
          {hasMore && (
            <Button mt={6} onClick={fetchAndSetStarredRepos} rightIcon={<RiAddFill />}>
              Load more
            </Button>
          )}
        </Box>
      </Box>
    </>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'saved'])),
    },
  };
};
