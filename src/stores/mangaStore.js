"use strict";

import dispatcher from "../dispatcher/dispatcher";
import mangaConstants from "../constants/mangaConstants";
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
  getSearchResults(){
    return searched;
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
    case mangaConstants.LATEST_RETRIEVED:
      appendToLatest(payload.manga);
      break;
    case mangaConstants.POPULAR_RETRIEVED:
      appendToPopular(payload.manga);
      break;
    case mangaConstants.DETAILS_RETRIEVED:
      setMangaDetails(payload.details);
      break;
    case mangaConstants.SEARCH_RETRIEVED:
      setSearched(payload.manga);
      break;
    default:
      // no op
      break;
  }
  mangaStore.emit(payload.actionType);

});

export default mangaStore;
