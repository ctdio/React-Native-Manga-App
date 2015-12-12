"use strict";
import dispatcher from "../dispatcher/dispatcher";
import mangaConstants from "../constants/mangaConstants";

var latestPage = 0, popularPage = 0;

export function getLatestUpdates(){
  fetch("http://charlie-duong.com/manga/latestUpdates?page=" + latestPage)
    .then((response) => response.json()) // just get json from response
    .then(function(data){     // handle json
      latestPage++;
      dispatcher.dispatch({
        actionType : mangaConstants.LATEST_RETRIEVED,
        manga : data.manga
      });
    })
    .catch(function(error){
      console.log("request failed " + error);
      dispatcher.dispatch({
        actionType : mangaConstants.ERROR
      });
    });
}

export function getPopularManga(){
  fetch("http://charlie-duong.com/manga/popular?page=" + popularPage)
    .then((response) => response.json()) // just get json from response
    .then(function(data){     // handle json
      popularPage++;
      dispatcher.dispatch({
        actionType : mangaConstants.POPULAR_RETRIEVED,
        manga : data.manga
      });
    })
    .catch(function(error){
      console.log("request failed " + error);
      dispatcher.dispatch({
        actionType : mangaConstants.ERROR
      });
    });
}

export function search(query){
  fetch("http://charlie-duong.com/manga/search?search="+ query)
    .then((response) => response.json()) // just get json from response
    .then(function(data){     // handle json
      dispatcher.dispatch({
        actionType : mangaConstants.SEARCH_RETRIEVED,
        manga : data.manga
      });
    })
    .catch(function(error){
      console.log("request failed " + error);
      dispatcher.dispatch({
        actionType : mangaConstants.ERROR
      });
    });
}

export function getMangaDetails(mangaID){
  console.log(mangaID);
  fetch("https://www.mangaeden.com/api/manga/" + mangaID)
    .then((response) => response.json()) // just get json from response
    .then(function(data){     // handle json
      dispatcher.dispatch({
        actionType : mangaConstants.DETAILS_RETRIEVED,
        details : data
      });
    })
    .catch(function(error){
      console.log("request failed " + error);
      dispatcher.dispatch({
        actionType : mangaConstants.ERROR
      });
    });
}
