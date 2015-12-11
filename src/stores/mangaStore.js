"use strict";

import dispatcher from "../dispatcher/dispatcher";
import MangaConstants from "../constants/mangaConstants";
import EventEmitter from "EventEmitter";
// Store's state
var latest = [];
var popular = [];
var favorites = [];
var searched = [];
var mangaDetails = {};
// private functions to use in dispatcher register
function appendToLatest(manga){
  latest = latest.concat(manga);
}
function appendToPopular(manga){
  popular = popular.concat(manga);
}
function setSearched(manga){
  searched = manga;
}
function setFavorites(manga){
  favorites = manga;
}
function setMangaDetails(details){
  mangaDetails = details;
}


class MangaStore extends EventEmitter{
  constructor(){
    super();
  }
  getLatestUpdates(){
    return latest;
  }
  getPopularManga(){
    return popular;
  }
  getFavorites(){
    return favorites;
  }
  getMangaDetails(){
    return mangaDetails;
  }
}

var mangaStore = new MangaStore();

/**
 *  register for actions sent by dispatcher
 *
 *  payload always contain an actionType
 **/

dispatcher.register(function(payload){
  console.log(payload);
  switch(payload.actionType){
    case MangaConstants.LATEST_RETRIEVED:
      appendToLatest(payload.manga);
      mangaStore.emit(MangaConstants.LATEST_RETRIEVED);
      break;
    case MangaConstants.POPULAR_RETRIEVED:
      appendToPopular(payload.manga);
      mangaStore.emit(MangaConstants.POPULAR_RETRIEVED);
      break;
    case MangaConstants.DETAILS_RETRIEVED:
      setMangaDetails(payload.details);
      mangaStore.emit(MangaConstants.DETAILS_RETRIEVED);
      break;
    case MangaConstants.SEARCH_RETRIEVED:
      //setSearched(payload.manga);
      break;
    default:
      // no op
      break;
  }

});

export default mangaStore;
