"use strict";

import dispatcher from "../dispatcher/dispatcher";
import MangaConstants from "../constants/mangaConstants";

// Store's state
var latest = [];
var popular = [];
var favorites = [];
var searched = [];
var latestPage = 0;
var popularPage = 0;
// private functions to use in dispatcher register
function appendToLatest(manga, callback){
  latest = latest.concat(manga);
  latestPage++;
  callback();
}
function appendToPopular(manga, callback){
  popular = popular.concat(manga);
  popularPage++;
  callback();
}
function setSearched(manga, callback){
  searched = manga;
  callback();
}
function setFavorites(manga, callback){
  favorites = manga;
  callback();
}
// functions for observers
var latestUpdatesObservers = [];
var popularMangaObservers = [];
// class and public functions
// acts as a publisher
class MangaStore{
  constructor(){

  }
  addLatestListener(callback){
    latestUpdatesObservers.push(callback);
  }
  removeLatestListener(callback){
    for(var i = array.length - 1; i >= 0; i--) {
      if(latestUpdatesObservers[i] === callback) {
         array.splice(i, 1);
       }
    }
  }
  emit(event){
    console.log("called");
    for(var callback of latestUpdatesObservers){
      callback();
    }
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
      console.log(payload.manga);
      appendToLatest(payload.manga, function(){
        console.log("event is emitting");
        mangaStore.emit(MangaConstants.LATEST_RETRIEVED);
      });

      break;
    case MangaConstants.POPULAR_RETRIEVED:
      appendToPopular(payload.manga);
      mangaStore.emit(MangaConstants.POPULAR_RETRIEVED);
      break;
    case MangaConstants.SEARCH_RETRIEVED:
      setSearched(payload.manga);
      mangaStore.emit(MangaConstants.SEARCH_RETRIEVED);
      break;
    default:
      // no op
  }
});

export default mangaStore;
