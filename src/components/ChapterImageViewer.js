"use strict";
import React, {
  Component,
  View,
  Image,
  Text,
  TouchableHighlight,
  ListView,
  InteractionManager,
  StyleSheet,
  PropTypes
} from "react-native";
import chapterStore from "../stores/chapterStore";
import * as ChapterActions from "../actions/chapterActions";
import ChapterConstants from "../constants/chapterConstants";

export default class ChapterImageViewer extends Component{
  constructor(props){
    super(props);
    console.log("this component was instantiated");
    // set initial state
    var dataSource = new ListView.DataSource({
      rowHasChanged : (row1,row2) => row1 !== row2
    });
    this.state = {
      dataSource : dataSource
    };
  }
  componentDidMount(){
    console.log("component Mounted");
    var {chapterID} = this.props;
    InteractionManager.runAfterInteractions(() => {
      chapterStore.addListener(ChapterConstants.IMAGES_RETRIEVED, this.updateList.bind(this));
      ChapterActions.getChapterImages(chapterID);
    });
  }
  updateList(){
    console.log(chapterStore.getChapterImages());
    this.setState({
      dataSource : this.state.dataSource.cloneWithRows(chapterStore.getChapterImages())
    });
    console.log(this.state.dataSource);
  }
  render(){
    var {navigator} = this.props;
    return(
      <ListView
        initialListSize={1}
        dataSource={this.state.dataSource}
        renderRow={(rowData) => {
            console.log("rendered an image");
            console.log(rowData[1]);
            return (
              <Image
                style={styles.image}
                source={{uri : "https://cdn.mangaeden.com/mangasimg/" + rowData[1]}}
              />
            );
        }}
      />
    );
  }
}
ChapterImageViewer.propTypes = {
  chapterID : PropTypes.string.isRequired,
  navigator : PropTypes.object.isRequired
}
var styles = StyleSheet.create({
  image : {
    width : 300,
    height : 400,
    resizeMode : "contain",
    justifyContent : "center",
    alignSelf : "center"
  },
  text : {
    fontSize : 18,
  }
});
