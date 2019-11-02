import React from "react";
import { StyleSheet, View, Button } from "react-native";
import AwesomeButtonRick from "react-native-really-awesome-button/src/themes/rick";

import Chat from "./components/chat";
import Video from "./components/video";
import File from "./components/file";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: null
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.menu}>
          <View style={styles.menuButton}>
            <AwesomeButtonRick
              onPress={() => this.setState({ currentPage: "chat" })}
            >
              Chat
            </AwesomeButtonRick>
          </View>

          <View style={styles.menuButton}>
            <AwesomeButtonRick
              onPress={() => this.setState({ currentPage: "video" })}
            >
              Video
            </AwesomeButtonRick>
          </View>

          <View style={styles.menuButton}>
            <AwesomeButtonRick
              onPress={() => this.setState({ currentPage: "file" })}
            >
              File
            </AwesomeButtonRick>
          </View>
        </View>
        <View style={styles.content}>
          {this.state.currentPage == "chat" ? (
            <Chat />
          ) : this.state.currentPage == "video" ? (
            <Video />
          ) : this.state.currentPage == "file" ? (
            <File />
          ) : (
            console.log("Undefined page")
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#636c6e"
  },
  menu: {
    flex: 1,
    flexDirection: "row"
    // backgroundColor: "red"
  },
  menuButton: {
    flex: 1,
    paddingLeft: 40,
    paddingTop: 10
    // backgroundColor: "blue"
  },
  content: {
    flex: 5
  }
});
