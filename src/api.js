import axios from 'axios';
import orderBy from 'lodash/orderBy';
import concat from 'lodash/concat';
import groupSequential from './utils/groupSequential';

const apiBase = 'https://ws.audioscrobbler.com/2.0';
const apiKey = process.env.REACT_APP_LAST_FM_API_KEY;

const api = axios.create({
  baseURL: apiBase,
});

api.interceptors.request.use((config) => {
  config.params = config.params || {};
  config.params.api_key = apiKey;
  config.params.format = 'json';
  return config;
});

export const getUserInfo = (user) => api
  .get(`/?method=user.getinfo&user=${user}`);

export const getUserFriends = (user) => api
  .get(`/?method=user.getfriends&user=${user}`);

export const getUserRecentTracks = (user) => api
  .get(`/?method=user.getrecenttracks&user=${user}`);

export const getUserTopAlbums = (user, period = 'overall') => api
  .get(`/?method=user.gettopalbums&user=${user}&period=${period}`);

export const getUserTopArtists = (user, period = 'overall') => api
  .get(`/?method=user.gettopartists&user=${user}&period=${period}`);

export const getUserTopTracks = (user, period = 'overall') => api
  .get(`/?method=user.gettoptracks&user=${user}&period=${period}`);

export const getUserWeeklyAlbums = (user) => api
  .get(`/?method=user.getweeklyalbumchart&user=${user}`);

export const getUserWeeklyArtists = (user) => api
  .get(`/?method=user.getweeklyartistchart&user=${user}`);

export const getUserWeeklyTracks = (user) => api
  .get(`/?method=user.getweeklytrackchart&user=${user}`);

const getImage = (images) => {
  const [image] = images.reverse();
  return image;
};

const getText = (value) => (value && value['#text']) || value;

const mapTracks = (tracks, user) => tracks.map(({
  artist,
  album,
  name,
  mbid,
  url,
  date,
  image: images,
}) => ({
  artist: getText(artist),
  album: getText(album),
  name,
  mbid,
  url,
  date: getText(date),
  image: getText(getImage(images)),
  user,
}));

export const getPlayTimeline = async (user) => {
  const { data: { friends: { user: friends } } } = await getUserFriends(user);
  const users = [user, ...friends.map(({ name }) => name)];

  const usersTracks = await Promise
    .all(users
      .map(async (user) => {
        const { data } = await getUserRecentTracks(user);
        const { recenttracks: { track } } = data;
        return groupSequential(mapTracks(track, user), 'album');
      }));

  const data = orderBy(concat(...usersTracks), ['date'], ['desc'] );
  return { data };
}
