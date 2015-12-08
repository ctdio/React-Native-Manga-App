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

var observerMap = new Map();
observerMap.set(MangaConstants.LATEST_RETRIEVED, latestUpdatesObservers);
observerMap.set(MangaConstants.POPULAR_RETRIEVED, popularMangaObservers);
// class and public functions
// acts as a publisher
class MangaStore{
  constructor(){

  }
  addListener(event, callback){

    var observerArray = observerMap.get(event);
    if(observerArray !== undefined){
      observerArray.push(callback);
    }
  }
  removeListener(event, callback){
    var observerArray = observerMap.get(event);
    if(observerArray !== undefined){
      for(var i = array.length - 1; i >= 0; i--) {
        if(latestUpdatesObservers[i] === callback) {
           observerArray.splice(i, 1);
         }
      }
    }
  }
  emit(event){

    var observerArray = observerMap.get(event);

    if(observerArray !== undefined){
      for(var i = 0; i < observerArray.length; i++){
        observerArray[i]();
      }
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
  switch(payload.actionType){
    case MangaConstants.LATEST_RETRIEVED:
      appendToLatest(payload.manga, () => {
        mangaStore.emit(MangaConstants.LATEST_RETRIEVED);
      });
      break;
    case MangaConstants.POPULAR_RETRIEVED:
      appendToPopular(payload.manga, () => {
        mangaStore.emit(MangaConstants.POPULAR_RETRIEVED);
      });
      break;
    case MangaConstants.SEARCH_RETRIEVED:
      //setSearched(payload.manga);
      break;

    default:
      // no op
  }
});

export default mangaStore;
