import React, {
  Component,
  View,
  PropTypes,
  StyleSheet,
  Text
} from "react-native";
import NavBar from "./NavBar";
import LatestMangaList from "./LatestMangaList"
import ScrollableTabView from "react-native-scrollable-tab-view";

export default class MainView extends Component{
  static propTypes : {
    navigator : PropTypes.object.isRequired,
    title : PropTypes.string.isRequired
  }
  constructor(props){
    super(props);
  }
  render(){
    var {navigator, id} = this.props;
    return(
      <View style={styles.container}>
        <NavBar navigator={navigator} title={id}/>
        <LatestMangaList tabLabel="Latest" navigator={navigator}/>
      </View>
    );
  }
}
var styles = StyleSheet.create({
  container : {
    flex : 1
  }
});
