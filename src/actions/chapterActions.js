"use strict";

import dispatcher from "../dispatcher/dispatcher";
import ChapterConstants from "../constants/chapterConstants";
/**
 *  Functions having to do with the chapter store
 **/

export function getChapterImages(chapterID){
  fetch("https://www.mangaeden.com/api/chapter/"+ chapterID)
    .then((response) => response.json()) // just get json from response
    .then(function(data){     // handle json
      dispatcher.dispatch({
        actionType : ChapterConstants.IMAGES_RETRIEVED,
        images : data.images.reverse() // put images in correct order
      });
    })
    .catch(function(error){
      console.log("request failed " + error);
      dispatcher.dispatch({
        actionType : ChapterConstants.ERROR
      });
    });
}
