"use strict";
import React, {
  Component,
  View,
  Image,
  Text,
  ListView,
  StyleSheet,
  ToastAndroid,
  InteractionManager,
  PropTypes
} from "react-native";
import MangaItem from "./MangaItem";
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
    mangaStore.addListener(MangaConstants.LATEST_RETRIEVED,this.updateList.bind(this));
  }
  componentDidMount(){
    console.log(this.state);
    InteractionManager.runAfterInteractions(() => {
      // add a listener LATEST RETRIEVED is emitted, run the function callback

      // since there is nothing that will cause the first event to be called
      // call action that loads the first set
      MangaActions.getLatestUpdates();
    });
  }
  // this is the callback for updating the list after the store emits a change
  updateList(error){
    this.setState({
      dataSource : this.state.dataSource.cloneWithRows(mangaStore.getLatestUpdates())
    });
  }
  render(){
    var {navigator, id} = this.props;

    return(
      <ListView
        onEndReachedThreshold={100}
        onEndReached={MangaActions.getLatestUpdates}
        dataSource={this.state.dataSource}
        renderRow={(rowData) => {
            return (
              <MangaItem title={rowData.title} image={rowData.image}
                mangaID={rowData._id} navigator={navigator}
              />
            );
        }}
      />
    );
  }
}
