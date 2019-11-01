import React from "react";
import { StyleSheet, View, Button } from "react-native";

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
          <Button
            title="Chat"
            onPress={() => this.setState({ currentPage: "chat" })}
          />
          <Button
            title="Video"
            onPress={() => this.setState({ currentPage: "video" })}
          />
          <Button
            title="File"
            onPress={() => this.setState({ currentPage: "file" })}
          />
        </View>
        <View style={styles.content}>
          {this.state.currentPage == "chat" ? <Chat name="Remi"/> : console.log("non")}
          {this.state.currentPage == "video" ? <Video /> : console.log("non")}
          {this.state.currentPage == "file" ? <File /> : console.log("non")}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "yellow",
  },
  menu: {
    flex: 1,
    marginRight: 10,
    marginLeft: 10,
    // backgroundColor: "red"
  },
  content: {
    flex: 5
  }
});
