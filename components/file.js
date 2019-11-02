import React from "react";
import { StyleSheet, View, Button, Text } from "react-native";

export default class File extends React.Component {
  render() {
    return (
      <>
        <View style={styles.container}>
          <Text style={styles.headerStyle}>File</Text>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: "row",
    // justifyContent: "flex-start",
    // backgroundColor: "green"
  },
  headerStyle: {
    fontSize: 36,
    textAlign: "center",
    fontWeight: "100",
    marginBottom: 24
  }
});
