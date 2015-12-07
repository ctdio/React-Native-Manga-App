/**
 * This is the entry point for the application
 */
'use strict';
// imports
import React, {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Component,
  Navigator
} from "react-native";
import Launch from "./src/components/Launch";
import MainView from "./src/components/MainView";
import mangaStore from "./src/stores/mangaStore";

class ReactNativeFluxMangaApp extends Component{
  constructor(props){
    super(props);
  }
  renderScene(route, navigator){
    switch(route.id){
      case "MainView":
        return(<MainView id={route.id} navigator={navigator}/>)
      case "Launch":
      default:
        return(<Launch id={route.id} navigator={navigator}/>);
    }
  }
  render() {
    return (
      <Navigator
        initialRoute={{id : "Launch"}}
        configureScene={(route) => Navigator.SceneConfigs.FloatFromBottom}
        renderScene={this.renderScene}
      />
    );
  }
}
// styles
var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  }
});
AppRegistry.registerComponent('ReactNativeFluxMangaApp', () => ReactNativeFluxMangaApp);
