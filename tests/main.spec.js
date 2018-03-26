import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromisse from 'sinon-stub-promise';

import { search, searchAlbuns, searchArtists, searchTracks, searchPlaylists } from '../src/main';

global.fetch = require('node-fetch');

chai.use(sinonChai);
sinonStubPromisse(sinon);

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

    it('should exist searchAlbuns method', () => {
      expect(searchAlbuns).to.exist;
    });

    it('should exist searchArtists method', () => {
      expect(searchArtists).to.exist;
    });

    it('should exist searchTracks method', () => {
      expect(searchTracks).to.exist;
    });

    it('should exist searchPlaylists method', () => {
      expect(searchPlaylists).to.exist;
    });
  });

  describe('generic search', () => {

    let fetchedStub;
    let promise;

    beforeEach( () => {
      fetchedStub = sinon.stub(global, 'fetch');
      promise = fetchedStub.returnsPromise();
    });

    afterEach( () => {
      fetchedStub.restore();
    });

    it('should call fetch function', () => {

      let artists = search();
      expect(fetchedStub).to.be.calledOnce;
    });

    it('should call fetch with the correct URL', () => {

      context('passing one type', () => {
        let artists = search('Incubus', 'artist');
        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist');

        let albuns = search('Incubus', 'album');
        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album');
      });

      context('passing more than one type', () => {
        const artistAndAlbuns = search('Incubus', ['artist', 'album']);
        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist,album');
      });
    });

    it('should return JSON data from the promise', () => {
      promise.resolves({ body: 'json' });
      const artist = search('Incubus', 'artist');

      expect(artist.resolveValue).to.be.eql({ body: 'json' });
    });
  });
});
