import { API_URL, HEADERS } from './config';
import { toJson } from './utils';

global.fetch = require('node-fetch');

export const getAlbum = id =>
  global.fetch(`${API_URL}/albums/${id}`, HEADERS).then(toJson);

export const getAlbums = ids =>
  global.fetch(`${API_URL}/albums/ids=${ids}`, HEADERS).then(toJson);

export const getAlbumTracks = id =>
  global.fetch(`${API_URL}/albums/${id}/tracks`, HEADERS).then(toJson);
