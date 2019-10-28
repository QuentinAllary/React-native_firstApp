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
let localConnection = null;
let remoteConnection = null;
let sendChannel = null;

function initPeers() {
  configuration = {
    iceServers: [{ url: "stun:stun.l.google.com:19302" }]
  };

  // LocalConnection
  localConnection = new RTCPeerConnection(configuration);
  sendChannel = localConnection.createDataChannel("sendChannel");

  // Remote RTCPeer
  remoteConnection = new RTCPeerConnection(configuration);
  remoteConnection.ondatachannel = receiveChannelCallback;


  // Setup ICE
  localConnection.onicecandidate = e =>
    !e.candidate || remoteConnection.addIceCandidate(e.candidate);

  remoteConnection.onicecandidate = e =>
    !e.candidate || localConnection.addIceCandidate(e.candidate);

  //Connection
  localConnection
    .createOffer()
    .then(offer => localConnection.setLocalDescription(offer))
    .then(() =>
      remoteConnection.setRemoteDescription(localConnection.localDescription)
    )
    .then(() => remoteConnection.createAnswer())
    .then(answer => remoteConnection.setLocalDescription(answer))
    .then(() =>
      localConnection.setRemoteDescription(remoteConnection.localDescription)
    );

    
  console.log("Local co", localConnection);
  console.log("Remote co", remoteConnection);
}

function receiveChannelCallback(event) {
  receiveChannel = event.channel;
  receiveChannel.onmessage = handleReceiveMessage;
  receiveChannel.onopen = handleReceiveChannelStatusChange;
  receiveChannel.onclose = handleReceiveChannelStatusChange;
}

function handleReceiveChannelStatusChange(event) {
  if (receiveChannel) {
    console.log(
      "Receive channel's status has changed to " + receiveChannel.readyState
    );
  }
}

function handleReceiveMessage(event) {
  console.log("Received message", event.data);
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
