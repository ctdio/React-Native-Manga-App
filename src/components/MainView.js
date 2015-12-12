import React, {
  Component,
  View,
  PropTypes,
  StyleSheet,
  Text,
  InteractionManager,
  BackAndroid
} from "react-native";
import mangaConstants from "../constants/mangaConstants";
import * as mangaActions from "../actions/mangaActions";
import MangaList from "./MangaList";
import mangaStore from "../stores/mangaStore";
import ScrollableTabView from "react-native-scrollable-tab-view";
import TabBar from "./MangaViewTabBar";
export default class MainView extends Component{
  constructor(props){
    super(props);
  }
  render(){
    var {navigator, id} = this.props;
    /*
    <ScrollableTabView renderTabBar={() =>
        <TabBar backgroundColor="#1cb6fc"
          activeTextColor="white"
          inactiveTextColor="white"
          underlineColor="white"/>
    }>
    */
    return(
      <View style={styles.container}>
        <ScrollableTabView
            tabBarBackgroundColor="#1cb6fc"
            tabBarActiveTextColor="white"
            tabBarInactiveTextColor="white"
            tabBarUnderlineColor="white">
          <MangaList tabLabel="Latest" navigator={navigator}
            event={mangaConstants.LATEST_RETRIEVED} onEndReached={mangaActions.getLatestUpdates}
            onDataRetrieved={mangaStore.getLatestUpdates}
            key={1}
          />
          <MangaList tabLabel="Popular" navigator={navigator}
            event={mangaConstants.POPULAR_RETRIEVED} onEndReached={mangaActions.getPopularManga}
            onDataRetrieved={mangaStore.getPopularManga}
            key={2}
          />
        </ScrollableTabView>
      </View>
    );
  }
}
var styles = StyleSheet.create({
  container : {
    flex : 1
  }
});
MainView.propTypes = {
  navigator : PropTypes.object.isRequired,
  id : PropTypes.string.isRequired
}
