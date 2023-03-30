import type { NextApiRequest, NextApiResponse } from 'next';
import { getStarredRepos } from 'lib/github/getStarredRepos';

type Data = {
  repos: StarredRepo[];
  hasMore: boolean;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { page } = req.query;

  const { repos, hasMore } = await getStarredRepos(page ? Number(page) : undefined);

  if (repos) {
    res.status(200).json({ repos, hasMore });
  }
  // TODO: handle errors
}
