import React from "react";
import { StyleSheet, Button, View} from "react-native";

export default class Menu extends React.Component {
  render() {
    return (
      <>
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <Button title="Chat" />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Video" />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Files" />
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonContainer: {
    flex: 1,
    marginRight: 10,
    marginLeft: 10
  }
});
