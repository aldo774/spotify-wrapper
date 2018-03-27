global.fetch = require('node-fetch');

const TOKEN_API = 'BQD0oRFpLiEI7w4YQfEbSe3mXDYYY0GIkdVmLLZbQ7E7P' +
                  'qbTd5OeyZDtSXdHrF_p4J9iW_VD7BZqimjZbbOpo9xyso' +
                  'z5Y6R_wviMkgBXcuJ888iN9xZgwbkXK9sCfpMyvAGf1HlGgiMu';

const HEADERS = {
  headers: {
    Authorization: `"Bearer ${TOKEN_API}"`,
  },
};

export const search = (query, type) => global
  .fetch(`https://api.spotify.com/v1/search?q=${query}&type=${type}`, HEADERS)
  .then(data => data.json());

export const searchArtists = artists => search(artists, 'artist');

export const searchAlbums = albums => search(albums, 'album');

export const searchTracks = tracks => search(tracks, 'track');

export const searchPlaylists = playlists => search(playlists, 'playlist');
