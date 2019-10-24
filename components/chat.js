import React from "react";
import { View } from "react-native";

import { RTCPeerConnection } from "react-native-webrtc";


// const configuration = { iceServers: [{ url: "stun:stun.l.google.com:19302" }] };
// const pc = new RTCPeerConnection(configuration);
// const dataChannelOptions = {
//   ordered: false, // do not guarantee order
//   maxPacketLifeTime: 3000 // in milliseconds
// };

// var channel = pc.createDataChannel("my channel", dataChannelOptions);

// channel.onmessage = function(event) {
//   console.log("received: " + event.data);
// };

// channel.onopen = function() {
//   console.log("datachannel open");
// };

// channel.onclose = function() {
//   console.log("datachannel close");
// };

export default class Chat extends React.Component {
  constructor() {
    configuration = { iceServers: [{ url: "stun:stun.l.google.com:19302" }] },
    pc = new RTCPeerConnection(configuration),
    super();
    this.state = {
      text: "SIMON",
      pc: pc,
      configuration: configuration,
    };
  }

  myClick = () => {
    channel.send(this.state.text);
    console.log("Sending: " + this.state.text);
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: 335, flex: 3, backgroundColor: 'red'}}></View>
        <View style={{ height: 335, flex: 2 }}></View>
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          {/* <Button onClick={() => this.player.presentFullscreenPlayer()} title="Start video"></Button> */}
        </View>
      </View>
    );
  }
}
