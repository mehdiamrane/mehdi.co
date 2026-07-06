import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

export const prerender = true;

const WIDTH = 1200;
const HEIGHT = 630;
const ACCENT = '#FD3659';

const fontsDir = resolve(process.cwd(), 'public/fonts');
const interRegular = readFileSync(resolve(fontsDir, 'Inter-Regular.ttf'));
const interSemiBold = readFileSync(resolve(fontsDir, 'Inter-SemiBold.ttf'));
const interBold = readFileSync(resolve(fontsDir, 'Inter-Bold.ttf'));

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

async function renderCard(post: CollectionEntry<'blog'>) {
  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: WIDTH,
          height: HEIGHT,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0f0f0f',
          padding: '80px',
          fontFamily: 'Inter',
        },
        children: [
          {
            type: 'div',
            props: {
              style: { display: 'flex', flexDirection: 'column' },
              children: [
                {
                  type: 'div',
                  props: {
                    style: { width: 56, height: 6, backgroundColor: ACCENT, marginBottom: 40 },
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      fontSize: 60,
                      fontWeight: 700,
                      color: '#ffffff',
                      lineHeight: 1.2,
                      maxWidth: 1000,
                    },
                    children: post.data.title,
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      fontSize: 28,
                      fontWeight: 600,
                      color: ACCENT,
                      marginTop: 28,
                    },
                    children: formatDate(post),
                  },
                },
              ],
            },
          },
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: { display: 'flex', fontSize: 28, fontWeight: 600, color: '#ffffff' },
                    children: 'Mehdi Amrane',
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: { display: 'flex', fontSize: 24, fontWeight: 400, color: '#8a8a8a' },
                    children: 'mehdi.co',
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: WIDTH,
      height: HEIGHT,
      fonts: [
        { name: 'Inter', data: interRegular, weight: 400, style: 'normal' },
        { name: 'Inter', data: interSemiBold, weight: 600, style: 'normal' },
        { name: 'Inter', data: interBold, weight: 700, style: 'normal' },
      ],
    },
  );

  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: WIDTH } });
  return resvg.render().asPng();
}

export const GET: APIRoute = async ({ props }) => {
  const { post } = props as { post: CollectionEntry<'blog'> };
  const png = await renderCard(post);

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
