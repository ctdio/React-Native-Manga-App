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
  Image,
  BackAndroid,
  Component,
  TouchableOpacity,
  Navigator
} from "react-native";
import Launch from "./src/components/Launch";
import MainView from "./src/components/MainView";
import MangaDetailsView from "./src/components/MangaDetailsView";
import mangaStore from "./src/stores/mangaStore";

var _navigator;
BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});
var navigationBarRouteMapper = {
  LeftButton : function(route, navigator, index, navState) {
    if(index === 0){
      return null;
    }
    // icon used below was made by http:www.freepik.com
    return (
      <TouchableOpacity
        onPress={() => navigator.pop()}
        style={styles.navBarLeftButton}>
        <Image style={styles.navBarLeftButtonImage} source={require("./assets/images/back.png")}/>
      </TouchableOpacity>
    );
  },
  RightButton: function(route, navigator, index, navState) {
    return (
      null
    );
  },
  Title: function(route, navigator, index, navState) {
    return (
      <Text style={[styles.navBarText, styles.navBarTitleText]}>
        {route.id}
      </Text>
    );
  },
};

class ReactNativeFluxMangaApp extends Component{
  constructor(props){
    super(props);
  }
  renderScene(route, navigator){
    switch(route.id){
      case "Manga List":
        return(<MainView id={route.id} navigator={navigator}/>);
      case "Manga Details":
        return (<MangaDetailsView id={route.id} data={route.data} navigator={navigator}/>);
      case null:
        // dirty hack
        _navigator = navigator;
        return(<Launch id={route.id} navigator={navigator}/>);

    }
  }
  render() {
    return (
      <Navigator
        initialRoute={{id : null}}
        renderScene={this.renderScene}
        sceneStyle={styles.sceneStyle}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={navigationBarRouteMapper}
            style={styles.navBar}
          />
        }
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
  },
  navBar: {
    backgroundColor: '#00BCD4',
  },
  navBarTitleText: {
    color: "white",
    fontWeight: '500',
    marginVertical: 15,
  },
  navBarLeftButton: {
    paddingLeft: 10,
    paddingTop : 10
  },
  navBarLeftButtonImage: {
    width : 35,
    height : 35,
  },
  navBarButtonText: {
    color: "white",
  },
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
  },
  sceneStyle : {
    flex : 1
  }
});
AppRegistry.registerComponent('ReactNativeFluxMangaApp', () => ReactNativeFluxMangaApp);
