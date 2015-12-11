
import React, {
  Component,
  View,
  Text,
  Image,
  TouchableHighlight,
  StyleSheet,
  PropTypes
} from "react-native";
import Button from "apsl-react-native-button";
import ViewPager from "react-native-viewpager";

var pages= [
  {
    message : "Welcome!",
  },
  {
    message : "Read manga!",
  },
  {
    message : "Ready?"
  }
];

export default class Launch extends Component{
  constructor(props){
    super(props);
    var dataSource = new ViewPager.DataSource({
      pageHasChanged : (p1, p2) => p1 !== p2
    });
    this.state = {
      dataSource : dataSource.cloneWithPages(pages)
    }
  }
  buttonPressed(){
    this.props.navigator.push({id : "Manga List"});
  }
  renderPage(data, pageID){
    if(pageID == (pages.length - 1)){
      return(
        <View style={styles.container}>
          <Text style={styles.welcome}>{data.message}</Text>
          <Button onPress={this.buttonPressed.bind(this)} style={styles.button}>
              Let's go!
          </Button>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>{data.message}</Text>
      </View>
    );
  }
  render(){
    return(
      <ViewPager
        dataSource={this.state.dataSource}
        renderPage={this.renderPage}
        />
    );
  }
}

Launch.propTypes = {
  navigator : PropTypes.object.isRequired
}
var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00BCD4'
  },
  welcome: {
    color : "white",
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
  },
  image : {
    width : 300,
    height : 216,
  },
  button : {
    backgroundColor : "#FF4081",
    margin : 10
  },
  highlight : {
    padding : 10
  },
  text: {
    fontSize : 17,
    color : "white",
    textAlign: 'center'
  }
});
