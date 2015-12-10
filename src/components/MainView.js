import React, {
  Component,
  View,
  PropTypes,
  StyleSheet,
  Text,
  InteractionManager,
  BackAndroid
} from "react-native";
import MangaConstants from "../constants/mangaConstants";
import * as MangaActions from "../actions/mangaActions";
import MangaList from "./MangaList";
import mangaStore from "../stores/mangaStore";
import ScrollableTabView from "react-native-scrollable-tab-view";



export default class MainView extends Component{
  static propTypes : {
    navigator : PropTypes.object.isRequired,
    id : PropTypes.string.isRequired
  }
  constructor(props){
    super(props);
  }
  render(){
    var {navigator, id} = this.props;
    //<AndroidNavBar navigator={navigator} title={id}/>
    /*

    */

    return(
      <View style={styles.container}>
        <ScrollableTabView>
          <MangaList tabLabel="Latest" navigator={navigator}
            event={MangaConstants.LATEST_RETRIEVED} onEndReached={MangaActions.getLatestUpdates}
            onDataRetrieved={mangaStore.getLatestUpdates}
          />
          <MangaList tabLabel="Popular" navigator={navigator}
            event={MangaConstants.POPULAR_RETRIEVED} onEndReached={MangaActions.getPopularManga}
            onDataRetrieved={mangaStore.getPopularManga}
          />
        </ScrollableTabView>
      </View>
    );
  }
}
var styles = StyleSheet.create({
  container : {
    top : 40,
    flex : 1
  }
});
