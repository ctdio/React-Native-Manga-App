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
// import views
import Launch from "./src/components/Launch";
import MainView from "./src/components/MainView";
import MangaDetailsView from "./src/components/MangaDetailsView";
import ChapterList from "./src/components/ChapterList";
import ChapterImageViewer from "./src/components/ChapterImageViewer";

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
    // for anything else
    switch(route.id){
      case "Manga List":
        _navigator = navigator;
        return(<MainView id={route.id} navigator={navigator}/>);
      case "Manga Details":
        return (<MangaDetailsView id={route.id} title={route.title}
          image={route.image} mangaID={route.mangaID}
           navigator={navigator}/>);
      case "Chapter List":
        return(<ChapterList chapters={route.chapters}  navigator={navigator} />);
      case "Chapter Image Viewer":
        return(<ChapterImageViewer chapterID={route.chapterID}  navigator={navigator} />);
      default:
        // dirty hack
        _navigator = navigator;
        return(<Launch id={route.id} navigator={navigator}/>);

    }
  }
  render() {
    return (
      <Navigator
        initialRoute={{id : "Manga List"}}
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
    paddingLeft: 15,
    paddingTop : 15
  },
  navBarLeftButtonImage: {
    width : 25,
    height : 25,
  },
  navBarButtonText: {
    color: "white",
  },
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
  },
  sceneStyle : {
    flex : 1,
    marginTop: 50
  }
});
AppRegistry.registerComponent('ReactNativeFluxMangaApp', () => ReactNativeFluxMangaApp);
