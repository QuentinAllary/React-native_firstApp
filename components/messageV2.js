import React from "react";
import { View, Button, TextInput } from "react-native";

import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  mediaDevices,
  registerGlobals
} from "react-native-webrtc";

let configuration = null;
let offer = null;
let sendChannel = null;

function initPeers() {
  configuration = {
    iceServers: [{ url: "stun:stun.l.google.com:19302" }]
  };

  // LocalConnection ajroajzajeaozje
  pc = new RTCPeerConnection(configuration);
  pc.createOffer().then(desc => {
    pc.setLocalDescription(desc).then(() => {
      // Send pc.localDescription to peer
    });
  });
}


export default class Message extends React.Component {
  sendMessage() {
    var message = this.state.message;
    sendChannel.send(message);
  }

  render() {
    return (
      <View>
        <Button title="Connect Button" onPress={() => initPeers()}></Button>
        <Button title="Disconnect Button"></Button>
        <TextInput
          title="Enter your message"
          onChangeText={text => this.setState({ message: text })}
        ></TextInput>
        <Button title="Send" onPress={() => this.sendMessage()}></Button>
      </View>
    );
  }
}
