import SpotifyWebApi from 'spotify-web-api-node';

export const initSpotify = () => {
  // Initialize Spotify API
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_APP_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_APP_CLIENT_SECRET,
    redirectUri: process.env.SPOTIFY_APP_REDIRECT_URI,
  });

  return spotifyApi;
};

// TODO: handle errors
