import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import { renderOgCard, ogResponse } from '../../lib/og';

export const prerender = true;

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection('blog');
  return posts.map((post) => ({ params: { slug: post.id }, props: { post } }));
};

function formatDate(post: CollectionEntry<'blog'>) {
  return new Intl.DateTimeFormat(post.data.lang === 'fr' ? 'fr-FR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(post.data.date);
}

export const GET: APIRoute = async ({ props }) => {
  const { post } = props as { post: CollectionEntry<'blog'> };
  const png = await renderOgCard({ title: post.data.title, subtitle: formatDate(post) });
  return ogResponse(png);
};
