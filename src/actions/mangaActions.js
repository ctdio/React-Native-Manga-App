"use strict";
import dispatcher from "../dispatcher/dispatcher";
import MangaConstants from "../constants/mangaConstants";

var latestPage = 0, popularPage = 0;

export function getLatestUpdates(){
  fetch("http://charlie-duong.com/manga/latestUpdates?page=" + latestPage)
    .then((response) => response.json()) // just get json from response
    .then(function(data){     // handle json
      latestPage++;
      dispatcher.dispatch({
        actionType : MangaConstants.LATEST_RETRIEVED,
        manga : data.manga
      });
    })
    .catch(function(error){
      console.log("request failed " + error);
      dispatcher.dispatch({
        actionType : MangaConstants.ERROR
      });
    });
}

export function getPopularManga(){
  fetch("http://charlie-duong.com/manga/popular?page=" + popularPage)
    .then((response) => response.json()) // just get json from response
    .then(function(data){     // handle json
      popularPage++;
      dispatcher.dispatch({
        actionType : MangaConstants.POPULAR_RETRIEVED,
        manga : data.manga
      });
    })
    .catch(function(error){
      console.log("request failed " + error);
      dispatcher.dispatch({
        actionType : MangaConstants.ERROR
      });
    });
}

export function search(query){
  fetch("http://charlie-duong.com/manga/search?query="+ query)
    .then((response) => response.json()) // just get json from response
    .then(function(data){     // handle json
      dispatcher.dispatch({
        actionType : MangaConstants.POPULAR_RETRIEVED,
        manga : data.manga
      });
    })
    .catch(function(error){
      console.log("request failed " + error);
      dispatcher.dispatch({
        actionType : MangaConstants.ERROR
      });
    });
}

export function getMangaDetails(mangaID){
  console.log(mangaID);
  fetch("https://www.mangaeden.com/api/manga/" + mangaID)
    .then((response) => response.json()) // just get json from response
    .then(function(data){     // handle json
      dispatcher.dispatch({
        actionType : MangaConstants.DETAILS_RETRIEVED,
        details : data
      });
    })
    .catch(function(error){
      console.log("request failed " + error);
      dispatcher.dispatch({
        actionType : MangaConstants.ERROR
      });
    });
}
