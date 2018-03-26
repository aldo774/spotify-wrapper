global.fetch = require('node-fetch');

module.exports = {
  search: (query, type) => global
    .fetch(`https://api.spotify.com/v1/search?q=${query}&type=${type}`)
    .then(data => data.json()),
  searchArtists: () => {},
  searchAlbuns: () => {},
  searchTracks: () => {},
  searchPlaylists: () => {},
};
