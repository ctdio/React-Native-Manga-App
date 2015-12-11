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

export default class ChapterList extends Component{
  constructor(props){
    super(props);
    // set initial state
    var dataSource = new ListView.DataSource({
      rowHasChanged : (row1,row2) => row1 !== row2
    });
    this.state = {
      dataSource : dataSource
    };
  }
  componentDidMount(){
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        dataSource : this.state.dataSource.cloneWithRows(this.props.chapters)
      });
    });
  }
  handlePress(chapterID){
    this.props.navigator.push({
      id : "Chapter Image Viewer",
      chapterID : chapterID
    });
  }
  render(){
    var {navigator, onEndReached} = this.props;
    return(
      <ListView
        initialListSize={1}
        dataSource={this.state.dataSource}
        renderRow={(rowData) => {
            return (
              <TouchableHighlight
                onPress={this.handlePress.bind(this, rowData[3])}
                underlayColor={'#d3d3d3'}>
                <View style={styles.listItem}>
                  <Text style={styles.text}>Chapter {rowData[0]}: {rowData[2]}</Text>
                </View>
              </TouchableHighlight>
            );
        }}
      />
    );
  }
}
ChapterList.propTypes = {
  chapters : PropTypes.array.isRequired,
  navigator : PropTypes.object.isRequired
}
var styles = StyleSheet.create({
  listItem : {
    padding : 20
  },
  text : {
    fontSize : 18,
  }
});
