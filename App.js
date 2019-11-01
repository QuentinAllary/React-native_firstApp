import React from "react";
import { StyleSheet, View, Button } from "react-native";

import Chat from "./components/chat";
import Menu from "./components/menu";
import Home from "./components/home";

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
          <Button
            title="Chat"
            onPress={() => this.setState({ currentPage: "chat" })}
          />
        </View>
        <View style={styles.content}>
          {this.state.currentPage == "chat" ? <Chat /> : console.log("non")}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // marginTop: 48,
    flex: 1,
  },
  chat: {
    // backgroundColor: "powderblue",
    flex: 6
  },
  menu: {
    // backgroundColor: "skyblue",
    flex: 1
  },
  content: {
    flex: 5
  },
  buttonContainer: {
    flex: 1,
    marginRight: 10,
    marginLeft: 10
  }
});
