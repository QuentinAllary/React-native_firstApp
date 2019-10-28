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

function createOffer() {
  configuration = {
    iceServers: [{ url: "stun:stun.l.google.com:19302" }]
  };

  // LocalConnection
  pc = new RTCPeerConnection(configuration);
  pc.createOffer().then(desc => {
    pc.setLocalDescription(desc);
    console.log("Offer", desc);
  });
}

function createAnswer(sdp){
  pc.createAnswer(sdp).then(desc => {
    pc.setRemoteDescription(desc);
    console.log("Pc remote answer", desc);

  })

}

export default class Message extends React.Component {
  sendMessage() {
    var message = this.state.message;
    sendChannel.send(message);
  }

  render() {
    return (
      <View>
        <Button title="Offer Button" onPress={() => createOffer()}></Button>
        <Button title="Answer Button" onPress={() => createAnswer(this.state.sdp)}></Button>
        <TextInput
          title="Enter your message"
          onChangeText={text => this.setState({sdp: text})}
        ></TextInput>
        <Button title="Send" onPress={() => this.sendMessage()}></Button>
      </View>
    );
  }
}
