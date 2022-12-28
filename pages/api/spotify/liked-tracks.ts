import type { NextApiRequest, NextApiResponse } from 'next';
import { getLikedTracks } from 'lib/spotify/getLikedTracks';

type Data = {
  tracks: SpotifyApi.SavedTrackObject[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const tracks = await getLikedTracks();
  if (tracks) {
    res.status(200).json({ tracks });
  }
  // TODO: handle errors
}
