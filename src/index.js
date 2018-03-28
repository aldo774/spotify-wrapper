import {
  search,
  searchAlbums,
  searchArtists,
  searchPlaylists,
  searchTracks,
} from './search';

import {
  getAlbum,
  getAlbums,
  getAlbumTracks,
} from './album';

import { API_URL } from './config'

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
  constructor(options){
    this.apiURL = options.apiURL || API_URL;
    this.token = options.token;
  };
};
