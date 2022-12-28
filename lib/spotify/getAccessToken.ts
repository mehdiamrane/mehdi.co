import fetch from 'isomorphic-unfetch';

const client_id = process.env.SPOTIFY_APP_CLIENT_ID;
const client_secret = process.env.SPOTIFY_APP_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_APP_USER_REFRESH_TOKEN as string;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';

interface IAccessTokenResponse {
  access_token: string;
  refresh_token: string;
}
export const getAccessToken = async (): Promise<IAccessTokenResponse> => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
    }).toString(),
  });

  return response.json();
};

// TODO: handle errors
