import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromisse from 'sinon-stub-promise';

import { API_URL } from '../src/config';
import SpotifyWrapper from '../src/index';

global.fetch = require('node-fetch');

chai.use(sinonChai);
sinonStubPromisse(sinon);

describe('Spotify Wrapper', () => {

  let fetchedStub;
  let promise;
  let spotify;

  beforeEach( () => {
    spotify = new SpotifyWrapper({
      token: 'foo',
    });
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

    it('should exist search albuns method', () => {
      expect(spotify.search.albums).to.exist;
    });

    it('should exist search artists method', () => {
      expect(spotify.search.artists).to.exist;
    });

    it('should exist search tracks method', () => {
      expect(spotify.search.tracks).to.exist;
    });

    it('should exist search playlists method', () => {
      expect(spotify.search.playlists).to.exist;
    });
  });

  describe('Artist Search', () => {
    it('should call fetch function', () => {

      let artists = spotify.search.artists();
      expect(fetchedStub).to.be.calledOnce;
    });

    it('should call fetch with the correct URL', () => {

      context('passing one artist', () => {
        let artist = spotify.search.artists('Incubus');
        expect(fetchedStub).to.have.been
          .calledWith(`${API_URL}/search?q=Incubus&type=artist`);

        let artist2 = spotify.search.artists('Muse');
        expect(fetchedStub).to.have.been
          .calledWith(`${API_URL}/search?q=Muse&type=artist`);
      });

      context('passing more than one type', () => {
        let artists = spotify.search.artists(['Incubus', 'Muse']);
        expect(fetchedStub).to.have.been
          .calledWith(`${API_URL}/search?q=Incubus,Muse&type=artist`);
      });
    });
  });

  describe('Album Search', () => {
    it('should call fetch function', () => {

      let albums = spotify.search.albums();
      expect(fetchedStub).to.be.calledOnce;
    });

    it('should call fetch with the correct URL', () => {

      context('passing one album', () => {
        let album = spotify.search.albums('Incubus');
        expect(fetchedStub).to.have.been
          .calledWith(`${API_URL}/search?q=Incubus&type=album`);

        let album2 = spotify.search.albums('Muse');
        expect(fetchedStub).to.have.been
          .calledWith(`${API_URL}/search?q=Muse&type=album`);
      });

      context('passing more than one type', () => {
        let albums = spotify.search.albums(['Incubus', 'Muse']);
        expect(fetchedStub).to.have.been
          .calledWith(`${API_URL}/search?q=Incubus,Muse&type=album`);
      });
    });
  });

  describe('Track Search', () => {
    it('should call fetch function', () => {

      let tracks = spotify.search.tracks();
      expect(fetchedStub).to.be.calledOnce;
    });

    it('should call fetch with the correct URL', () => {

      context('passing one track', () => {
        let track = spotify.search.tracks('Incubus');
        expect(fetchedStub).to.have.been
          .calledWith(`${API_URL}/search?q=Incubus&type=track`);

        let track2 = spotify.search.tracks('Muse');
        expect(fetchedStub).to.have.been
          .calledWith(`${API_URL}/search?q=Muse&type=track`);
      });

      context('passing more than one type', () => {
        let tracks = spotify.search.tracks(['Incubus', 'Muse']);
        expect(fetchedStub).to.have.been
          .calledWith(`${API_URL}/search?q=Incubus,Muse&type=track`);
      });
    });
  });

  describe('Playlist Search', () => {
    it('should call fetch function', () => {

      let playlists = spotify.search.playlists();
      expect(fetchedStub).to.be.calledOnce;
    });

    it('should call fetch with the correct URL', () => {

      context('passing one playlist', () => {
        let playlist = spotify.search.playlists('Incubus');
        expect(fetchedStub).to.have.been
          .calledWith(`${API_URL}/search?q=Incubus&type=playlist`);

        let playlist2 = spotify.search.playlists('Muse');
        expect(fetchedStub).to.have.been
          .calledWith(`${API_URL}/search?q=Muse&type=playlist`);
      });

      context('passing more than one type', () => {
        let playlists = spotify.search.playlists(['Incubus', 'Muse']);
        expect(fetchedStub).to.have.been
          .calledWith(`${API_URL}/search?q=Incubus,Muse&type=playlist`);
      });
    });
  });
});
