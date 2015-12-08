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
import MangaItem from "./MangaItem"
import * as MangaActions from "../actions/mangaActions";
import MangaConstants from "../constants/mangaConstants";
import mangaStore from "../stores/mangaStore";

export default class PopularMangaList extends Component{
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
  }
  componentDidMount(){
    console.log(this.state);
    InteractionManager.runAfterInteractions(() => {
      mangaStore.addListener(MangaConstants.POPULAR_RETRIEVED, this.updateList.bind(this));
      MangaActions.getPopularManga();
    });
  }
  // this is the callback for updating the list after the store emits a change
  updateList(){
    this.setState({
      dataSource : this.state.dataSource.cloneWithRows(mangaStore.getPopularManga())
    });
  }
  render(){
    var {navigator} = this.props;
    return(
      <ListView
        onEndReachedThreshold={100}
        onEndReached={MangaActions.getPopularManga}
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
