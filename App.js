import React from "react";
import { StyleSheet, View, Button } from "react-native";

import Chat from "./components/chat";
import Video from "./components/video";
import File from "./components/file";
import Profil from "./components/profil";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: null,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.menu}>
          <View style={styles.menuButton}>
            <Button
              title="Chat"
              onPress={() => this.setState({ currentPage: "chat" })}
            />
          </View>

          <View style={styles.menuButton}>
            <Button
              title="Video"
              onPress={() => this.setState({ currentPage: "video" })}
            />
          </View>

          <View style={styles.menuButton}>
            <Button
              title="File"
              onPress={() => this.setState({ currentPage: "file" })}
            />
          </View>

          <View style={styles.menuButton}>
            <Button
              title="Profil"
              onPress={() => this.setState({ currentPage: "profil" })}
            />
          </View>
        </View>
        <View style={styles.content}>
          {this.state.currentPage == "chat" ? (
            <Chat />
          ) : this.state.currentPage == "video" ? (
            <Video />
          ) : this.state.currentPage == "file" ? (
            <File />
          ) : this.state.currentPage == "profil" ? (
            <Profil />
          ) : console.log("Undefined page")}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    // backgroundColor: "yellow"
  },
  menu: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start"
    // backgroundColor: "green"
  },
  menuButton: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10
  },
  content: {
    flex: 10
  }
});
