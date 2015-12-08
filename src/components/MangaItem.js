"use strict";
import React, {
  Component,
  View,
  Image,
  Text,
  StyleSheet,
  TouchableHighlight,
  PropTypes
} from "react-native";
import * as MangaActions from "../actions/mangaActions";
import MangaConstants from "../constants/mangaConstants";
import mangaStore from "../stores/mangaStore";

export default class MangaItem extends Component{
  static propTypes : {
    navigator : PropTypes.object.isRequired,
    title : PropTypes.string.isRequired,
    image : PropTypes.string.isRequired,
    mangaID : PropTypes.string.isRequired
  }
  constructor(props){
    super(props);
  }
  handlePress(error){
    var {navigator, title, image, mangaID} = this.props;
    navigator.push({
      id : "Manga Details",
      data : {
          title : title,
          image : image,
          mangaID : mangaID
      }
    });
  }
  render(){
    var {title, image} = this.props;
    return(
      <TouchableHighlight underlayColor={"#03A9F4"}
        onPress={this.handlePress.bind(this)}>
        <View style={styles.container} >
          <Image style={styles.image}
            source={{uri: "https://cdn.mangaeden.com/mangasimg/" + image}}
            defaultSource={require("../../assets/images/not-found.png")}/>
          <Text>{title}</Text>
        </View>
      </TouchableHighlight>
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
    height : 150
  }
});
