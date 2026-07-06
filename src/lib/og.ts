import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

export const WIDTH = 1200;
export const HEIGHT = 630;
export const ACCENT = '#FD3659';

const fontsDir = resolve(process.cwd(), 'public/fonts');
const interRegular = readFileSync(resolve(fontsDir, 'Inter-Regular.ttf'));
const interSemiBold = readFileSync(resolve(fontsDir, 'Inter-SemiBold.ttf'));
const interBold = readFileSync(resolve(fontsDir, 'Inter-Bold.ttf'));

export interface OgCardOptions {
  title: string;
  subtitle?: string;
}

function titleFontSize(title: string) {
  if (title.length > 60) return 40;
  if (title.length > 40) return 48;
  return 60;
}

export async function renderOgCard({ title, subtitle }: OgCardOptions): Promise<Buffer> {
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
                      fontSize: titleFontSize(title),
                      fontWeight: 700,
                      color: '#ffffff',
                      lineHeight: 1.2,
                      maxWidth: 1000,
                    },
                    children: title,
                  },
                },
                subtitle && {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      fontSize: 28,
                      fontWeight: 600,
                      color: ACCENT,
                      marginTop: 28,
                    },
                    children: subtitle,
                  },
                },
              ].filter(Boolean),
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

export function ogResponse(png: Buffer): Response {
  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
