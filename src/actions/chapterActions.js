"use strict";

import dispatcher from "../dispatcher/dispatcher";
import chapterConstants from "../constants/chapterConstants";
/**
 *  Functions having to do with the chapter store
 **/

export function getChapterImages(chapterID){
  fetch("https://www.mangaeden.com/api/chapter/"+ chapterID)
    .then((response) => response.json()) // just get json from response
    .then(function(data){     // handle json
      console.log(chapterConstants);
      dispatcher.dispatch({
        actionType : chapterConstants.IMAGES_RETRIEVED,
        images : data.images.reverse() // put images in correct order
      });
    })
    .catch(function(error){
      dispatcher.dispatch({
        actionType : chapterConstants.ERROR
      });
    });
}
