import React from "react";
import { StyleSheet, View, Button, Text, TextInput } from "react-native";

export default class Profil extends React.Component {
  render() {
    return (
      <>
        <View style={styles.container}>
          <Text style={styles.headerStyle}>Profil</Text>

          <TextInput
            style={styles.message}
            onChangeText={text => super.setState({ name: text })}
          ></TextInput>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
