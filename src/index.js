import {
  search,
  searchAlbums,
  searchArtists,
  searchPlaylists,
  searchTracks,
} from './search';

import album from './album';

import { API_URL } from './config'
import { toJson } from './utils';

// module.exports = {
//   search,
//   searchAlbums,
//   searchArtists,
//   searchPlaylists,
//   searchTracks,
//   getAlbum,
//   getAlbums,
//   getAlbumTracks,
// };

export default class SpotifyWrapper {
  constructor(options) {
    this.apiURL = options.apiURL || API_URL;
    this.token = options.token;
    this.album = album.bind(this)();
  };

  request(url, token) {

    let headers = {
      headers: {
        Authorization: `"Bearer ${this.token}"`,
      },
    };

    return fetch(url, headers).then(toJson);
  };
};
