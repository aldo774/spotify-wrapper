import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

import { API_URL } from '../src/config';
import SpotifyWrapper from '../src/index';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

describe('Album', () => {
  let stubedFetch;
  let promise;
  let spotify;

  beforeEach( () => {
    spotify = new SpotifyWrapper({
      token: 'foo',
    })
    stubedFetch = sinon.stub(global, 'fetch');
    promise = stubedFetch.returnsPromise();
  });

  afterEach( () => {
    stubedFetch.restore();
  });

  describe('Smoke Tests', () => {
    it('should have getAlbum method', () => {
      expect(spotify.album.getAlbum).to.exist;
    });

    describe('Smoke Tests', () => {
      it('should have getAlbums method', () => {
        expect(spotify.album.getAlbum).to.exist;
      });
    });

    it('should have getAlbumTracks method', () => {
      expect(spotify.album.getTracks).to.exist;
    });
  });

  describe('getAlbum', () => {
    it('should call fetch method', () => {
      let album = spotify.album.getAlbum();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with correct url', () => {
      let album = spotify.album.getAlbum('3cVNp1AXxdzoKIs9r6keWU');
      expect(stubedFetch).to.have.been
        .calledWith(`${API_URL}/albums/3cVNp1AXxdzoKIs9r6keWU`);

      let album2 = spotify.album.getAlbum('3cVNp1AXxdzoKIs9r6keWK');
      expect(stubedFetch).to.have.been
        .calledWith(`${API_URL}/albums/3cVNp1AXxdzoKIs9r6keWK`);
    });
    // Verifica se o dado é recebido pela promise
    it('should return correct data from promise', () => {
      promise.resolves({ album: "name"});
      let album = spotify.album.getAlbum('3cVNp1AXxdzoKIs9r6keWU');
      expect(album.resolveValue).to.be.eql({ album: "name"});
    });
  });

  describe('getAlbums', () => {
    it('should call fetch method', () => {
      let albums = spotify.album.getAlbums();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with correct url', () => {
      let albums = spotify.album.getAlbums(['3cVNp1AXxdzoKIs9r6keWU', '3cVNp1AXxdzoKIs9r6keWK']);
      expect(stubedFetch).to.have.been
        .calledWith(`${API_URL}/albums/ids=3cVNp1AXxdzoKIs9r6keWU,3cVNp1AXxdzoKIs9r6keWK`);
    });
    // Verifica se o dado é recebido pela promise
    it('should return correct data from promise', () => {
      promise.resolves({ album1: "name", album2: "name"});
      let albums = spotify.album.getAlbums(['3cVNp1AXxdzoKIs9r6keWU', '3cVNp1AXxdzoKIs9r6keWK']);
      expect(albums.resolveValue).to.be.eql({ album1: "name", album2: "name"});
    });
  });

  describe('getTracks', () => {
    it('should call fetch method', () => {
      let albumTracks = spotify.album.getTracks();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with correct url', () => {
      let albumTracks = spotify.album.getTracks('3cVNp1AXxdzoKIs9r6keWU');
      expect(stubedFetch).to.have.been
        .calledWith(`${API_URL}/albums/3cVNp1AXxdzoKIs9r6keWU/tracks`);

      let albumTracks2 = spotify.album.getTracks('3cVNp1AXxdzoKIs9r6keWK');
      expect(stubedFetch).to.have.been
        .calledWith(`${API_URL}/albums/3cVNp1AXxdzoKIs9r6keWK/tracks`);
    });
    // Verifica se o dado é recebido pela promise
    it('should return correct data from promise', () => {
      promise.resolves({ albumTrack: "name"});
      let albumTracks = spotify.album.getTracks('3cVNp1AXxdzoKIs9r6keWU');
      expect(albumTracks.resolveValue).to.be.eql({ albumTrack: "name"});
    });
  });

});
