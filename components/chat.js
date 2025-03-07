import React from "react";
import { StyleSheet, Text, TextInput, Button, View } from "react-native";
import AwesomeButtonRick from "react-native-really-awesome-button/src/themes/rick";

const localhost = "192.168.43.41"
export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      chat: "",
      name: null
    };
    ws = new WebSocket("ws://"+localhost+":23456");
    ws.onopen = () => {
      console.log("connection opened");
    };

    ws.onmessage = e => {
      console.log("Received from server: ", e.data);

      let new_chat = this.state.chat + "\n" + e.data;
      this.setState({ chat: new_chat });
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
    if (this.state.message != null && this.state.name != null) {
      let msg = this.state.name + ": " + this.state.message;
      ws.send(msg); // send a message
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
            <View style={styles.messageBody}>
              <TextInput
                placeholder="Your name"
                style={styles.name}
                onChangeText={text => this.setState({ name: text })}
              ></TextInput>
              <TextInput
                placeholder="Your message"
                style={styles.message}
                onChangeText={text => this.setState({ message: text })}
              >
                {this.state.message}
              </TextInput>
              <AwesomeButtonRick
                type="secondary"
                onPress={() => this.postMessage()}
              >
                Send
              </AwesomeButtonRick>
            </View>
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  chatBox: {
    flex: 4,
    paddingLeft: 5,
    paddingRight: 5
  },
  messageBody: {
    flexDirection: "row",
  },
  message: {
    borderColor: "black",
    borderWidth: 1,
    flex: 4
  },
  name: {
    borderColor: "green",
    borderWidth: 1,
    flex: 1
  },
  headerStyle: {
    fontSize: 36,
    textAlign: "center",
    fontWeight: "100",
    marginBottom: 24
  }
});
