"use strict";
import dispatcher from "../dispatcher/dispatcher";
import MangaConstants from "../constants/mangaConstants";

export function getLatestUpdates(page){
  fetch("http://charlie-duong.com/manga/latestUpdates?page=" + page)
    .then((response) => response.json()) // just get json from response
    .then(function(data){     // handle json
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
/*
export function getPopular(page){
  fetch("http://charlie-duong.com/manga/popular?page=" + page)
    .then((response) => response.json()) // just get json from response
    .then(function(data){     // handle json
      console.log(data);
      dispatcher.dispatch({
        actionType : MangaConstants.POPULAR_RETRIEVED,
        manga : data.manga
      })
    })
    .catch(function(error){
      console.log("request failed " + error);
      dispatcher.dispatch({
        actionType : MangaConstants.ERROR
      });
    });
}

export function search(query, page){
  fetch("http://charlie-duong.com/manga/search?query="+ query +"&page=" + page)
    .then((response) => response.json()) // just get json from response
    .then(function(data){     // handle json
      console.log(data);
      dispatcher.dispatch({
        actionType : MangaConstants.POPULAR_RETRIEVED,
        manga : data.manga
      })
    })
    .catch(function(error){
      console.log("request failed " + error);
      dispatcher.dispatch({
        actionType : MangaConstants.ERROR
      });
    });
}
*/
