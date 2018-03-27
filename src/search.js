import { API_URL, HEADERS } from './config';
import { toJson } from './utils';

global.fetch = require('node-fetch');

export const search = (query, type) =>
  global.fetch(`${API_URL}/search?q=${query}&type=${type}`, HEADERS).then(toJson);

export const searchArtists = artists => search(artists, 'artist');

export const searchAlbums = albums => search(albums, 'album');

export const searchTracks = tracks => search(tracks, 'track');

export const searchPlaylists = playlists => search(playlists, 'playlist');
