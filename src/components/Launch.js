
import React, {
  Component,
  View,
  Text,
  Image,
  TouchableHighlight,
  StyleSheet,
  PropTypes
} from "react-native";
export default class Launch extends Component{
  static propTypes = {
    navigator : PropTypes.object.isRequired
  }
  constructor(props){
    super(props);
  }
  handlePress(){
    this.props.navigator.replace({id : "MainView"});
  }
  render(){
    // must use .bind(this) to get access to props
    return(
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome!</Text>
        <Image style={styles.image} source={require("../../assets/images/onePunch.gif")}/>

          <View style={styles.button}>
            <TouchableHighlight style={styles.highlight} underlayColor={"#03A9F4"}
              onPress={this.handlePress.bind(this)}>
            <Text style={styles.text}>Tap here to move to next scene</Text>
            </TouchableHighlight>
          </View>


      </View>
    );
  }
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
    borderWidth : 2,
    borderRadius : 5,
    marginTop : 10,
    justifyContent : "center",
    alignItems : "center"
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
