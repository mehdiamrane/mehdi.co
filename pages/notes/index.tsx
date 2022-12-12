import React, { FC } from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import useTranslation from 'hooks/useTranslation';
import { getAllNotesContent } from 'utils/mdxUtils';
import NotesPlaceholder from 'components/notes/NotesPlaceholder';
import Sidebar from 'components/notes/Sidebar';
import ColumnLayout from 'components/layout/ColumnLayout';

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

      <ColumnLayout
        keepOnMobile='aside'
        main={<NotesPlaceholder />}
        aside={<Sidebar notes={notes} />}
      />
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
