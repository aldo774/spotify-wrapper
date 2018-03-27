import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromisse from 'sinon-stub-promise';

import { API_URL } from '../src/config';
import { search, searchAlbums, searchArtists, searchTracks, searchPlaylists } from '../src/search';

global.fetch = require('node-fetch');

chai.use(sinonChai);
sinonStubPromisse(sinon);

describe('Spotify Wrapper', () => {

  let fetchedStub;
  let promise;

  beforeEach( () => {
    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.returnsPromise();
  });

  afterEach( () => {
    fetchedStub.restore();
  });

  describe('Smoke Tests', () => {
    // search (genérico) - + de 1 tipo
    // searchAlbuns
    // searchArtists
    // searchTracks
    // searchPlaylists

    it('should exist search method', () => {
      expect(search).to.exist;
    });

    it('should exist searchAlbuns method', () => {
      expect(searchAlbums).to.exist;
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

  describe('Generic Search', () => {

    it('should call fetch function', () => {

      let artists = search();
      expect(fetchedStub).to.be.calledOnce;
    });

    it('should call fetch with the correct URL', () => {

      context('passing one type', () => {
        let artists = search('Incubus', 'artist');
        expect(fetchedStub).to.have.been
          .calledWith(`${API_URL}/search?q=Incubus&type=artist`);

        let albuns = search('Incubus', 'album');
        expect(fetchedStub).to.have.been
          .calledWith(`${API_URL}/search?q=Incubus&type=album`);
      });

      context('passing more than one type', () => {
        const artistAndAlbuns = search('Incubus', ['artist', 'album']);
        expect(fetchedStub).to.have.been
          .calledWith(`${API_URL}/search?q=Incubus&type=artist,album`);
      });
    });

    it('should return JSON data from the promise', () => {
      promise.resolves({ body: 'json' });
      const artist = search('Incubus', 'artist');

      expect(artist.resolveValue).to.be.eql({ body: 'json' });
    });
  });

  describe('Artist Search', () => {
    it('should call fetch function', () => {

      let artists = searchArtists();
      expect(fetchedStub).to.be.calledOnce;
    });

    it('should call fetch with the correct URL', () => {

      context('passing one artist', () => {
        let artist = searchArtists('Incubus');
        expect(fetchedStub).to.have.been
          .calledWith(`${API_URL}/search?q=Incubus&type=artist`);

        let artist2 = searchArtists('Muse');
        expect(fetchedStub).to.have.been
          .calledWith(`${API_URL}/search?q=Muse&type=artist`);
      });

      context('passing more than one type', () => {
        let artists = searchArtists(['Incubus', 'Muse']);
        expect(fetchedStub).to.have.been
          .calledWith(`${API_URL}/search?q=Incubus,Muse&type=artist`);
      });
    });
  });

  describe('Album Search', () => {
    it('should call fetch function', () => {

      let albums = searchAlbums();
      expect(fetchedStub).to.be.calledOnce;
    });

    it('should call fetch with the correct URL', () => {

      context('passing one album', () => {
        let album = searchAlbums('Incubus');
        expect(fetchedStub).to.have.been
          .calledWith(`${API_URL}/search?q=Incubus&type=album`);

        let album2 = searchAlbums('Muse');
        expect(fetchedStub).to.have.been
          .calledWith(`${API_URL}/search?q=Muse&type=album`);
      });

      context('passing more than one type', () => {
        let albums = searchAlbums(['Incubus', 'Muse']);
        expect(fetchedStub).to.have.been
          .calledWith(`${API_URL}/search?q=Incubus,Muse&type=album`);
      });
    });
  });

  describe('Track Search', () => {
    it('should call fetch function', () => {

      let tracks = searchTracks();
      expect(fetchedStub).to.be.calledOnce;
    });

    it('should call fetch with the correct URL', () => {

      context('passing one track', () => {
        let track = searchTracks('Incubus');
        expect(fetchedStub).to.have.been
          .calledWith(`${API_URL}/search?q=Incubus&type=track`);

        let track2 = searchTracks('Muse');
        expect(fetchedStub).to.have.been
          .calledWith(`${API_URL}/search?q=Muse&type=track`);
      });

      context('passing more than one type', () => {
        let tracks = searchTracks(['Incubus', 'Muse']);
        expect(fetchedStub).to.have.been
          .calledWith(`${API_URL}/search?q=Incubus,Muse&type=track`);
      });
    });
  });

  describe('Playlist Search', () => {
    it('should call fetch function', () => {

      let playlists = searchPlaylists();
      expect(fetchedStub).to.be.calledOnce;
    });

    it('should call fetch with the correct URL', () => {

      context('passing one playlist', () => {
        let playlist = searchPlaylists('Incubus');
        expect(fetchedStub).to.have.been
          .calledWith(`${API_URL}/search?q=Incubus&type=playlist`);

        let playlist2 = searchPlaylists('Muse');
        expect(fetchedStub).to.have.been
          .calledWith(`${API_URL}/search?q=Muse&type=playlist`);
      });

      context('passing more than one type', () => {
        let playlists = searchPlaylists(['Incubus', 'Muse']);
        expect(fetchedStub).to.have.been
          .calledWith(`${API_URL}/search?q=Incubus,Muse&type=playlist`);
      });
    });
  });
});
