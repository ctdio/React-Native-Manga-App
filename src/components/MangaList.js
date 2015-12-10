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

export default class MangaList extends Component{
  static propTypes : {
    navigator : PropTypes.object.isRequired,
    event : PropTypes.string.isRequired,
    onEndReached : PropTypes.func.isRequired,
    onDataRetrieved : PropTypes.func.isRequired
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
  updateList(){
    var {onDataRetrieved} = this.props;
    this.setState({
      dataSource : this.state.dataSource.cloneWithRows(onDataRetrieved())
    });
  }
  componentDidMount(){
    var {event, onEndReached} = this.props;
    console.log(event);
    console.log(onEndReached);
    InteractionManager.runAfterInteractions(() => {
      // since there is nothing that will cause the first event to be called
      // call action that loads the first set
      mangaStore.addListener(event, this.updateList.bind(this));
      onEndReached();
    });
  }
  render(){
    var {navigator, onEndReached} = this.props;
    return(
      <ListView
        onEndReachedThreshold={100}
        onEndReached={onEndReached}
        dataSource={this.state.dataSource}
        renderRow={(rowData) => {
            return (
              <MangaItem title={rowData.title} image={rowData.image}
                mangaID={rowData._id} navigator={navigator} key={rowData._id}
              />
            );
        }}
      />
    );
  }
}
