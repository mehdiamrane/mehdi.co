import { getAccessToken } from 'lib/spotify/getAccessToken';
import { initSpotify } from 'lib/spotify/initSpotify';

export const getLikedTracks = () => {
  // Initialize Spotify API
  const spotifyApi = initSpotify();

  // Retrieve an access token and a refresh token
  const tracks = getAccessToken()
    .then((data) => {
      // Set the access token on the API object to use it in later calls
      spotifyApi.setAccessToken(data.access_token);
      spotifyApi.setRefreshToken(data.refresh_token);

      // Get user's liked tracks
      return spotifyApi.getMySavedTracks({
        limit: 50,
        offset: 0,
      });
    })
    .then((response) => {
      const tracks = response.body.items;
      return tracks;
    })
    .catch((err) => console.log('Something went wrong when retrieving an access token', err));

  return tracks;
};

// TODO: handle errors
