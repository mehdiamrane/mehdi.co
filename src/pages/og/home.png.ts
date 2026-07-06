import type { APIRoute } from 'astro';
import { renderOgCard, ogResponse } from '../../lib/og';
import content from '../../data/content';

export const prerender = true;

export const GET: APIRoute = async () => {
  const png = await renderOgCard({ title: content.en.hero.description });
  return ogResponse(png);
};
