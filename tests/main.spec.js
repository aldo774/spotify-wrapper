import { expect } from 'chai';
import { search } from '../src/main';

describe('Spotify Wrapper', () => {
  describe('smoke tests', () => {

    // search (genérico) - + de 1 tipo
    // searchAlbuns
    // searchArtists
    // searchTracks
    // searchPlaylists

    it('should exist search method', () => {
      expect(search).to.exist;
    });
  });

});
