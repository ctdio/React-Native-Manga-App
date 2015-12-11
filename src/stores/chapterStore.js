"use strict";

import dispatcher from "../dispatcher/dispatcher";
import ChapterConstants from "../constants/chapterConstants";
import EventEmitter from "EventEmitter";

var chapterImages = [];
function setChapterImages(imageArray){
  chapterImages = imageArray;
}
class ChapterStore extends EventEmitter{
  constructor(){
    super();
  }
  getChapterImages(){
    return chapterImages;
  }
}

var chapterStore = new ChapterStore();

/**
 *  register for actions sent by dispatcher
 *
 *  payload always contain an actionType
 **/

dispatcher.register(function(payload){
  console.log(payload);
  switch(payload.actionType){
    case ChapterConstants.IMAGES_RETRIEVED:
      setChapterImages(payload.images);
      chapterStore.emit(ChapterConstants.IMAGES_RETRIEVED);
      break;
    default:
      //no op
  }
});

export default chapterStore;
