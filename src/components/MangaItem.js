/**
 *  React Component for Manga that is displayed in a list.
 **/
"use strict";
import React, {
  Component,
  View,
  Image,
  Text,
  StyleSheet,
  TouchableHighlight,
  PixelRatio,
  PropTypes
} from "react-native";
import Dimensions from "Dimensions";

export default class MangaItem extends Component{
  constructor(props){
    super(props);
    var imageLength = Math.min(Dimensions.get("window").height, Dimensions.get("window").width) / 4;
    console.log(imageLength);
    this.state= {
      imageLength : imageLength
    };
  }
  handlePress(error){
    var {navigator, title, image, mangaID} = this.props;
    navigator.push({
      id : "Manga Details",
      title : title,
      image : image,
      mangaID : mangaID
    });

  }
  render(){
    var {title, image} = this.props;
    return(
      <TouchableHighlight underlayColor={"#03A9F4"}
        onPress={this.handlePress.bind(this)}>
        <View style={styles.container} >
          <Image style={{
              margin : 10,
              width : this.state.imageLength,
              height : this.state.imageLength,
            }}
            source={{uri: "https://cdn.mangaeden.com/mangasimg/" + image}}
            defaultSource={require("../../assets/images/not-found.png")}/>
          <View style={styles.textWrapper}>
            <Text style={styles.text}>{title}</Text>
          </View>

        </View>
      </TouchableHighlight>
    );
  }
}
MangaItem.propTypes = {
  navigator : PropTypes.object.isRequired,
  title : PropTypes.string.isRequired,
  image : PropTypes.string.isRequired,
  mangaID : PropTypes.string.isRequired
};
var styles = StyleSheet.create({
  container : {
    flexDirection : "row",
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image : {
    margin : 10,
  },
  textWrapper : {
    flex : 1,
    paddingRight : 10,
  },
  text : {
    fontSize : 16,
    textAlign : "center"
  }
});
