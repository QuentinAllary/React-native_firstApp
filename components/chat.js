import React from "react";
import { StyleSheet, Text, TextInput, Button, View } from "react-native";

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      chat: "",
      name: null,
      ws: null
    };
    ws = new WebSocket("ws://192.168.1.10:23456");
    ws.onopen = () => {
      console.log("connection opened");
    };

    ws.onmessage = e => {
      console.log("Received from server: ", e.data);
      
      let new_chat = this.state.chat + "\n" + e.data
      this.setState({chat: new_chat});
    };

    ws.onerror = e => {
      // an error occurred
      console.log(e.message);
    };

    ws.onclose = e => {
      // connection closed
      console.log(e.code, e.reason);
    };
  }

  postMessage() {
    if (this.state.message != null) {
      ws.send(this.state.message); // send a message
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
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  chatBox: {
    flex: 4,
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
