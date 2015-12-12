import React, {
  Component,
  ScrollView,
  View,
  Text,
  Image,
  PropTypes,
  InteractionManager,
  StyleSheet
} from "react-native";
import Button from "apsl-react-native-button";
import * as mangaActions from "../actions/mangaActions";
import mangaConstants from "../constants/mangaConstants";
import mangaStore from "../stores/mangaStore";
export default class MangaDetailsView extends Component{
  constructor(props){
    super(props);
    this.state = {
      detailsLoaded : false
    };
  }
  componentDidMount(){
    InteractionManager.runAfterInteractions(() => {
      // upon view load, retrieve details on mangaApp and register event
      mangaStore.addListener(mangaConstants.DETAILS_RETRIEVED, this.updateDetails.bind(this));
      mangaActions.getMangaDetails(this.props.mangaID);
    });
  }
  updateDetails(){
    this.setState({
      detailsLoaded : true,
      mangaDetails : mangaStore.getMangaDetails()
    });
  }
  handlePress(){
    this.props.navigator.push({
      id : "Chapter List",
      chapters : this.state.mangaDetails.chapters
    });
  }
  renderTop(){
    var {navigator, title, image} = this.props;
    return(
      <View style={styles.container}>
        <Image style={styles.image}
          source={{uri: "https://cdn.mangaeden.com/mangasimg/" + image}}/>
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  }
  renderButton(){
    return(
      <Button onPress={this.handlePress.bind(this)}
        style={styles.button}
        textStyle={styles.buttonText}
        isLoading={!this.state.detailsLoaded}>
        View Chapters
      </Button>
    );
  }
  render(){
    var {navigator, title, image} = this.props;
    if(this.state.detailsLoaded === false){
      return(
        <ScrollView
          style={styles.mainContainer}
          contentContainerStyle={styles.container}>
          {this.renderTop()}
          {this.renderButton()}
        </ScrollView>
      );
    }
    var {mangaDetails} = this.state;
    return(
      <ScrollView
        contentContainerStyle={styles.container}>
        {this.renderTop()}
        <Text style={styles.text}>Released in {mangaDetails.released}</Text>
        <Text style={styles.text}>{mangaDetails.hits} hits</Text>
        <Text style={styles.text}>{mangaDetails.description}</Text>
        {this.renderButton()}
      </ScrollView>
    );
  }
}
MangaDetailsView.propTypes = {
  navigator : PropTypes.object.isRequired,
  title : PropTypes.string.isRequired,
  image : PropTypes.string.isRequired,
  mangaID : PropTypes.string.isRequired
};

var styles = StyleSheet.create({
  container : {
    alignItems: 'center',
    paddingHorizontal : 5
  },
  title : {
    fontSize : 30
  },
  button : {
    backgroundColor : "#52a9ff"
  },
  buttonText : {
    color : "white"
  },
  image : {
    width : 200,
    height : 300,
    resizeMode : "cover",
    justifyContent : "center"
  },
  text : {
    fontSize : 18
  }
});
