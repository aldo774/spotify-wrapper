import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

import { API_URL } from '../src/config';
import { getAlbum, getAlbums, getAlbumTracks } from '../src/album';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

describe('Album', () => {
  let stubedFetch;
  let promise;

  beforeEach( () => {
    stubedFetch = sinon.stub(global, 'fetch');
    promise = stubedFetch.returnsPromise();
  });

  afterEach( () => {
    stubedFetch.restore();
  });

  describe('Smoke Tests', () => {
    it('should have getAlbum method', () => {
      expect(getAlbum).to.exist;
    });

    it('should have getAlbumTracks method', () => {
      expect(getAlbumTracks).to.exist;
    });
  });

  describe('getAlbum', () => {
    it('should call fetch method', () => {
      let album = getAlbum();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with correct url', () => {
      let album = getAlbum('3cVNp1AXxdzoKIs9r6keWU');
      expect(stubedFetch).to.have.been
        .calledWith(`${API_URL}/albums/3cVNp1AXxdzoKIs9r6keWU`);

      let album2 = getAlbum('3cVNp1AXxdzoKIs9r6keWK');
      expect(stubedFetch).to.have.been
        .calledWith(`${API_URL}/albums/3cVNp1AXxdzoKIs9r6keWK`);
    });
    // Verifica se o dado é recebido pela promise
    it('should return correct data from promise', () => {
      promise.resolves({ album: "name"});
      let album = getAlbum('3cVNp1AXxdzoKIs9r6keWU');
      expect(album.resolveValue).to.be.eql({ album: "name"});
    });
  });

  describe('getAlbums', () => {
    it('should call fetch method', () => {
      let albums = getAlbums();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with correct url', () => {
      let albums = getAlbums(['3cVNp1AXxdzoKIs9r6keWU', '3cVNp1AXxdzoKIs9r6keWK']);
      expect(stubedFetch).to.have.been
        .calledWith(`${API_URL}/albums/ids=3cVNp1AXxdzoKIs9r6keWU,3cVNp1AXxdzoKIs9r6keWK`);
    });
    // Verifica se o dado é recebido pela promise
    it('should return correct data from promise', () => {
      promise.resolves({ album1: "name", album2: "name"});
      let albums = getAlbums(['3cVNp1AXxdzoKIs9r6keWU', '3cVNp1AXxdzoKIs9r6keWK']);
      expect(albums.resolveValue).to.be.eql({ album1: "name", album2: "name"});
    });
  });

  describe('getAlbumTracks', () => {
    it('should call fetch method', () => {
      let albumTracks = getAlbumTracks();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with correct url', () => {
      let albumTracks = getAlbumTracks('3cVNp1AXxdzoKIs9r6keWU');
      expect(stubedFetch).to.have.been
        .calledWith(`${API_URL}/albums/3cVNp1AXxdzoKIs9r6keWU/tracks`);

      let albumTracks2 = getAlbumTracks('3cVNp1AXxdzoKIs9r6keWK');
      expect(stubedFetch).to.have.been
        .calledWith(`${API_URL}/albums/3cVNp1AXxdzoKIs9r6keWK/tracks`);
    });
    // Verifica se o dado é recebido pela promise
    it('should return correct data from promise', () => {
      promise.resolves({ albumTrack: "name"});
      let albumTracks = getAlbumTracks('3cVNp1AXxdzoKIs9r6keWU');
      expect(albumTracks.resolveValue).to.be.eql({ albumTrack: "name"});
    });
  });

});
