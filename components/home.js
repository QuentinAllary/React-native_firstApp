import React from "react";
import { StyleSheet, TextInput, View, Button, Text } from "react-native";

export default class Menu extends React.Component {
  render() {
    return (
      <>
        <View>
          <Text>Enter your name</Text>
          <TextInput
            style={{ borderColor: "black", borderWidth: 1 }}
            onChangeText={text => this.setState({ name: text })}
          ></TextInput>
          <Button
            title="Go to chat!"
            onPress={() => navigate("Chat", { name: this.state.name })}
          />
        </View>
      </>
    );
  }
}
