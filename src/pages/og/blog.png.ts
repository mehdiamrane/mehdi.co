import type { APIRoute } from 'astro';
import { renderOgCard, ogResponse } from '../../lib/og';

export const prerender = true;

export const GET: APIRoute = async () => {
  const png = await renderOgCard({ title: 'Blog', subtitle: 'Notes on front-end development' });
  return ogResponse(png);
};
