import React from "react";
import { StyleSheet, Text, TextInput, Button, View } from "react-native";

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      chat: "",
      name: null
    };
  }

  getMessage() {}

  postMessage() {
    let message = this.state.message;

    if (message != null) {
      let chat = this.state.chat + "\n " + message;
      this.setState({ chat: chat });
      this.setState({ message: null });
    }
  }

  render() {
    return (
      <>
        <Text style={styles.headerStyle}>Chat</Text>
        <View style={{ flex: 1 }}>
          <View style={styles.chatBox}>
            <Text>{this.state.chat}</Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.messageHeader}>Enter your message</Text>
            <TextInput
              style={styles.message}
              onChangeText={text => this.setState({ message: text })}
            >
              {this.state.message}
            </TextInput>
          </View>
          <View style={{ flex: 1 }}>
            <Button title="Send" onPress={() => this.postMessage()}></Button>
            <Button title="Get" onPress={() => this.getMessage()}></Button>
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  chatBox: {
    flex: 4,
    backgroundColor: "green"
  },
  message: {
    borderColor: "black",
    borderWidth: 1
  },
  messageHeader: {
    textAlign: "center"
  },
  headerStyle: {
    fontSize: 36,
    textAlign: "center",
    fontWeight: "100",
    marginBottom: 24
  },
  elementsContainer: {
    backgroundColor: "#ecf5fd",
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 24
  }
});
