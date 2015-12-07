"use strict";
import React, {
  Component,
  View,
  Image,
  Text,
  ListView,
  StyleSheet,
  PropTypes
} from "react-native";
import * as MangaActions from "../actions/mangaActions";
import MangaConstants from "../constants/mangaConstants";
import mangaStore from "../stores/mangaStore";
export default class LatestMangaList extends Component{
  static propTypes : {
    navigator : PropTypes.object.isRequired
  }
  constructor(props){
    super(props);
    // set initial state

    var dataSource = new ListView.DataSource({
      rowHasChanged : (row1,row2) => row1 !== row2
    });
    this.state = {
      dataSource : dataSource
    };
    // add a listener LATEST RETRIEVED is emitted, run the function callback
    mangaStore.addLatestListener(this.updateList.bind(this));

    // since there is nothing that will cause the first event to be called
    // call action that loads the first set
    MangaActions.getLatestUpdates();
  }
  // this is the callback for updating the list after the store emits a change
  updateList(){
    console.log("This was called to update");
    this.setState({
      dataSource : this.state.dataSource.cloneWithRows(mangaStore.getLatestUpdates())
    });
  }
  render(){
    var {navigator, id} = this.props;
    return(
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => {
            return (
              <View style={styles.container}>
                <Image style={styles.image}
                  source={{uri: "https://cdn.mangaeden.com/mangasimg/" + rowData.image}}/>
                <Text>{rowData.title}</Text>
              </View>
            );
        }}
      />
    );
  }
}
var styles = StyleSheet.create({
  container : {
    flex : 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image : {
    width : 300,
    height : 300
  }
});
