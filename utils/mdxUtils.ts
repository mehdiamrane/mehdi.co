import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

import rehypePrismPlus from 'rehype-prism-plus';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import rehypeCodeTitles from 'rehype-code-titles';

export const NOTES_PATH = path.join(process.cwd(), 'content/notes'); // useful when you want to get the path to a specific file
export const noteFilePaths = fs.readdirSync(NOTES_PATH).filter((path) => /\.mdx?$/.test(path)); // Only include md(x) files
// noteFilePaths is the list of all mdx files inside the NOTES_PATH directory

const mdxOptions = {
  remarkPlugins: [],
  rehypePlugins: [rehypeSlug, rehypeCodeTitles, rehypePrismPlus, rehypeAutolinkHeadings],
};

/// /////////////////////////
// NOTES UTILS
/// /////////////////////////

type matterData = Record<string, unknown>;

// UTILS
export const formatMatterData = (data: matterData): matterData => {
  const dataCopy: matterData = {};
  for (const [key, value] of Object.entries(data)) {
    if (value instanceof Date) {
      dataCopy[key] = JSON.stringify(value);
    } else {
      dataCopy[key] = value;
    }
  }
  return dataCopy;
};

// getStaticProps
export const getAllNotesContent = (locale: string) => {
  const noteFilePathsCorrectLocale = noteFilePaths.filter((filePath) =>
    filePath.includes(`.${locale}`),
  );

  const notes = noteFilePathsCorrectLocale.map((filePath) => {
    const source = fs.readFileSync(path.join(NOTES_PATH, filePath));
    const { content, data } = matter(source);
    const filePathArr = filePath.split('.');
    const slug = filePathArr[0];

    return {
      content,
      data: formatMatterData(data),
      filePath,
      slug,
    };
  });

  return notes.filter((note) => note.data.isPublished);
};

// getStaticProps
export const getSingleNoteContent = async (slug: string, locale: string) => {
  const noteFilePath = path.join(NOTES_PATH, `${slug}.${locale}.mdx`);
  const source = fs.readFileSync(noteFilePath);
  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    mdxOptions,
    scope: formatMatterData(data),
  });

  return { mdxSource, data: formatMatterData(data) };
};

// getStaticPaths
export const getNotesStaticPaths = () => {
  const paths: { params: { slug: string }; locale: string }[] = [];

  noteFilePaths.forEach((filePath) => {
    const filePathArr = filePath.split('.');
    paths.push({ params: { slug: filePathArr[0] }, locale: filePathArr[1] });
  });

  return paths;
};
