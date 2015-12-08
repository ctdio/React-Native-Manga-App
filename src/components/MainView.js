import React, {
  Component,
  View,
  PropTypes,
  StyleSheet,
  Text,
  InteractionManager,
  BackAndroid
} from "react-native";
import LatestMangaList from "./LatestMangaList"
import PopularMangaList from "./PopularMangaList"
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
    return(
      <View style={styles.container}>
        <ScrollableTabView>
          <LatestMangaList tabLabel="Latest" navigator={navigator}/>
          <PopularMangaList tabLabel="Popular" navigator={navigator}/>
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
