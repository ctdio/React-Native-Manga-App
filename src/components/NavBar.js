import React, {
  Component,
  View,
  Text,
  PropTypes,
  ToolbarAndroid,
  StyleSheet
} from "react-native";

export default class NavBar extends Component{
  static propTypes : {
    navigator : PropTypes.object.isRequired
  }
  constructor(props){
    super(props)
  }
  onBackPressed(){
    console.log(this.props);
    this.props.navigator.pop();
  }
  onActionSelected(){}
  render(){
    console.log("This got called to render");
    return(
      <ToolbarAndroid
        title={this.props.title}
        titleColor={"white"}
        style={styles.toolbar}
      />
    );
  }
}
/*
navIcon={require("../../assets/images/hamburger.png")}
actions={
  [
    {title : "Settings", icon : require("../../assets/images/hamburger.png"), show : "always"}
  ]
}
onActionSelected={this.onActionSelected.bind(this)}
*/

var styles = StyleSheet.create({
  toolbar : {
    backgroundColor : "#00BCD4",
    height : 56,
  }
});
