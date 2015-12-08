import React, {
  Component,
  ScrollView,
  View,
  Text,
  Image,
  PropTypes,
  ToolbarAndroid,
  StyleSheet
} from "react-native";
import * as MangaActions from "../actions/mangaActions";
export default class MangaDetailsView extends Component{
  static propTypes : {
    navigator : PropTypes.object.isRequired,
    title : PropTypes.string.isRequired,
    image : PropTypes.string.isRequired,
    mangaID : PropTypes.string.isRequired
  }
  constructor(props){
    super(props);
    //MangaActions.getMangaDetails(props.data.mangaID);
  }
  render(){
    var {navigator, data} = this.props;
    return(
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={styles.container}>
        <Text style={styles.title}>{data.title}</Text>
        <Image style={styles.image}
          source={{uri: "https://cdn.mangaeden.com/mangasimg/" + data.image}}/>
      </ScrollView>
    );
  }
}

var styles = StyleSheet.create({
  mainContainer: {
    flex : 1,
  },
  container : {
    alignItems: 'center',
    top : 50,
  },
  title : {
    fontSize : 30,
    textAlign : "center"
  },
  image : {
    width : 300,
    height : 400
  },
  toolbar : {
    backgroundColor : "#00BCD4",
    height : 56,
  }
});
