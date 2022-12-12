import React, { FC, useRef } from 'react';
import { getSingleNoteContent, getNotesStaticPaths, getAllNotesContent } from 'utils/mdxUtils';
import MDXContent from 'components/mdx/MDXContent';
import { GetStaticProps, GetStaticPaths } from 'next';
import useTranslation from 'hooks/useTranslation';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import ColumnLayout from 'components/layout/ColumnLayout';
import Sidebar from 'components/notes/Sidebar';
import useScrollToTopWithoutAnchor from 'hooks/useScrollToTopWithoutAnchor';

type NotePageProps = {
  source: NoteSource;
  frontMatter: NoteFrontMatter;
  notes: Note[];
};

interface IGetStaticProps {
  params?: any;
  locale?: string;
}

const NotePage: FC<NotePageProps> = ({ notes, source, frontMatter }) => {
  const { t } = useTranslation('notes');
  const topDivRef = useRef<HTMLDivElement>(null);

  useScrollToTopWithoutAnchor({ ref: topDivRef, trigger: frontMatter });

  return (
    <>
      <Head>
        <title>{`${frontMatter.title} ${t('meta.partial-title')}`}</title>
        <meta name='description' content={frontMatter.summary} />
      </Head>
      <ColumnLayout
        keepOnMobile='main'
        main={<MDXContent topDivRef={topDivRef} source={source} frontMatter={frontMatter} />}
        aside={<Sidebar notes={notes} />}
      />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({
  params,
  locale = 'en',
}: IGetStaticProps) => {
  const { mdxSource, data } = await getSingleNoteContent(params.slug, locale);
  const notes = getAllNotesContent(locale);
  return {
    props: {
      notes,
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
