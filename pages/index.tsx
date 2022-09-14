import React from 'react';
import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import HomeHero from 'components/blocks/HomeHero';
import SectionTitle from 'components/blocks/SectionTitle';
import s from 'styles/pages/HomePage.module.scss';
import PostsList from 'components/posts/PostsList';
import useTranslation from 'hooks/useTranslation';

const HomePage: NextPage = () => {
  const { t } = useTranslation('home');

  return (
    <>
      <Head>
        <title>Mehdi Amrane | Fullstack JavaScript Developer</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={s.homepage}>
        <div className={s.homepage__hero}>
          <HomeHero />
        </div>

        <div className={s.homepage__posts}>
          <SectionTitle title={t('section.posts.title')} subtitle={t('section.posts.subtitle')} moreHref='/blog' />
          <PostsList />
        </div>

        <div className={s.homepage__snippets}>
          <SectionTitle title={t('section.snippets.title')} subtitle={t('section.snippets.subtitle')} moreHref='/snippets' />
          <PostsList />
        </div>

        <div className={s.homepage__projects}>
          <SectionTitle title={t('section.projects.title')} subtitle={t('section.projects.subtitle')} moreHref='/projects' />
          <PostsList />
        </div>
      </main>
    </>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'home'])),
    },
  };
};
