import React, { FC } from 'react';
import { getSingleNoteContent, getNotesStaticPaths } from 'utils/mdxUtils';
import MDXContent from 'components/mdx/MDXContent';
import { GetStaticProps, GetStaticPaths } from 'next';
import useTranslation from 'hooks/useTranslation';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

type NotePageProps = {
  source: NoteSource;
  frontMatter: NoteFrontMatter;
};

const NotePage: FC<NotePageProps> = ({ source, frontMatter }) => {
  const { t } = useTranslation('notes');

  return (
    <>
      <Head>
        <title>
          {frontMatter.title} {t('meta.partial-title')}
        </title>
        <meta name='description' content={frontMatter.summary} />
      </Head>
      <MDXContent source={source} frontMatter={frontMatter} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({
  params,
  locale = 'en',
}: {
  params?: any;
  locale?: string;
}) => {
  const { mdxSource, data } = await getSingleNoteContent(params.slug, locale);

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
      ...(await serverSideTranslations(locale, ['common', 'notes'])),
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  const paths = getNotesStaticPaths();
  return { paths, fallback: false };
};

export default NotePage;
