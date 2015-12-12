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
import SearchView from "./src/components/SearchView";
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
        onPress={() => {console.log("popping"); navigator.pop()}}
        style={styles.navBarLeftButton}>
        <Image style={styles.navBarLeftButtonImage} source={require("./assets/images/back.png")}/>
      </TouchableOpacity>
    );
  },
  RightButton: function(route, navigator, index, navState) {
    if(route.id === "Search"){
      return null;
    }
    //Icon made by Egor Rumyantsev. "http://www.flaticon.com/authors/egor-rumyantsev"
    return (
      <TouchableOpacity
        onPress={() => {
          // disable button if the current view is the search view
          if(index == (navState.routeStack.length - 1) && (route.id !== "Search")){
            navigator.push({
              id : "Search"
            });
          }
        }}
        style={styles.navBarRightButton}>
        <Image style={styles.navBarRightButtonImage} source={require("./assets/images/magnifying-glass.png")}/>
      </TouchableOpacity>

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
    var view;
    switch(route.id){
      case "Manga List":
        _navigator = navigator;
        view = (<MainView id={route.id} navigator={navigator}/>);
        break;
      case "Manga Details":
        view = (<MangaDetailsView id={route.id} title={route.title}
          image={route.image} mangaID={route.mangaID}
           navigator={navigator}/>
        );
        break;
      case "Chapter List":
        view = (<ChapterList chapters={route.chapters}  navigator={navigator} />);
        break;
      case "Chapter Image Viewer":
        view = (<ChapterImageViewer chapterID={route.chapterID}  navigator={navigator} />);
        break;
        case "Search":
          view = (<SearchView navigator={navigator} />);
          break;
      default:
        // dirty hack
        _navigator = navigator;
        view = (<Launch id={route.id} navigator={navigator}/>);
        break;
    }
    return view;
  }
  render() {
    return (
      <Navigator
        initialRoute={{id : "Manga List"}}
        renderScene={this.renderScene}
        sceneStyle={styles.sceneStyle}
        configureScene={() => Navigator.SceneConfigs.FloatFromBottom}
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
    backgroundColor: '#1cb6fc',
  },
  navBarTitleText: {
    color: "white",
    fontWeight: '500',
    marginVertical: 15,
  },
  navBarLeftButton: {
    padding : 15
  },
  navBarRightButton: {
    padding : 17
  },
  navBarLeftButtonImage: {
    width : 25,
    height : 25,
  },
  navBarRightButtonImage: {
    width : 20,
    height : 20,
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
    marginTop: 50,
    backgroundColor : "white"
  }
});
AppRegistry.registerComponent('ReactNativeFluxMangaApp', () => ReactNativeFluxMangaApp);
