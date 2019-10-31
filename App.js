import React from "react";
import { StyleSheet, Text, TextInput, Button, View } from "react-native";

import Chat from "./components/chat";
import Menu from "./components/menu";
export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.leftCol}>
          <Chat />
        </View>
        <View style={styles.rightCol}>
          <Menu />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 48,
    flex: 1,
    flexDirection: "row"
  },
  leftCol: {
    backgroundColor: "powderblue",
    flex: 3
  },
  rightCol: {
    backgroundColor: "skyblue",
    flex: 1
  }
});
