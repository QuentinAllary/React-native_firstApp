import React from "react";
import { StyleSheet, View } from "react-native";

import Chat from "./components/chat";
import Menu from "./components/menu";
export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.menu}>
          <Menu />
        </View>
        <View style={styles.chat}>
          <Chat />
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
  }
});
