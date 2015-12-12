"use strict";
import React, {
  Component,
  View,
  ScrollView,
  Text,
  TextInput,
  ListView,
  InteractionManager,
  StyleSheet,
  PropTypes
} from "react-native";

import Button from "apsl-react-native-button";
import MangaItem from "../components/MangaItem";
import mangaStore from "../stores/mangaStore";
import mangaConstants from "../constants/mangaConstants";
import * as mangaActions from "../actions/mangaActions";
export default class SearchView extends Component{
  constructor(props){
    super(props);
    // set initial state
    var dataSource = new ListView.DataSource({
      rowHasChanged : (row1,row2) => row1 !== row2
    });
    this.state = {
      dataSource : dataSource
    };
    mangaStore.addListener(mangaConstants.SEARCH_RETRIEVED, this.updateList.bind(this));
  }
  updateList(){
    var newDataSource = new ListView.DataSource({
      rowHasChanged : (row1,row2) => row1 !== row2
    });
    this.setState({
      dataSource : newDataSource.cloneWithRows(mangaStore.getSearchResults())
    });
  }
  handlePress(){
    mangaActions.search(this.state.search);
  }
  render(){
/*
<View style={styles.inputWrapper}>
  <TextInput
    placeholder="Enter name of Manga here"
    onChangeText={(text) => this.setState({
        search : text,
        dataSource : this.state.dataSource
      })
    }
    style={styles.textInput}
  />
  <Button style={styles.button} onPress={this.handlePress.bind(this)}><Text>Search</Text></Button>
</View>
*/
    return(
      <View style={styles.container}>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Enter name of Manga here"
            onChangeText={(text) => this.setState({
                search : text,
                dataSource : this.state.dataSource
              })
            }
            style={styles.textInput}
          />
          <Button style={styles.button} onPress={this.handlePress.bind(this)}><Text>Search</Text></Button>
        </View>
        <ListView
          style={styles.container}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => {
              return (
                <MangaItem title={rowData.title} image={rowData.image}
                  mangaID={rowData._id} navigator={this.props.navigator} key={rowData._id}
                />
              );
          }}
        />
      </View>

    );
  }
}
SearchView.propTypes = {
  navigator : PropTypes.object.isRequired
}
var styles = StyleSheet.create({
  container : {
    flex : 1,
  },
  inputWrapper : {
    flexDirection : "row"
  },
  textInput : {
    height : 60,
    borderColor : 'gray',
    borderWidth : 1,
    fontSize : 18,
    flex : 0.8
  },
  text : {
    fontSize : 18,
  },
  button : {
    flex : 0.2,
    top : 5,
    margin : 5
  }
});
