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
let videoUrl;

async function start() {
  configuration = {
    iceServers: [{ url: "stun:stun.l.google.com:19302" }]
  };

  let isFront = true;
  const pc1 = new RTCPeerConnection(configuration);
  const pc2 = new RTCPeerConnection(configuration);

  pc1.addEventListener("icecandidate", ({ candidate }) =>
    pc2.addIceCandidate(candidate)
  );
  pc2.addEventListener("icecandidate", ({ candidate }) =>
    pc1.addIceCandidate(candidate)
  );

  mediaDevices
    .getUserMedia({
      audio: true,
      video: {
        mandatory: {
          minWidth: 500, // Provide your own width, height and frame rate here
          minHeight: 300,
          minFrameRate: 30
        },
        facingMode: isFront ? "user" : "environment",
      }
    })
    .then(stream => {
      console.log("Stream: ", stream);
      videoUrl = stream.toURL();
      
    })
    .catch(error => {
      // Log error
    });

  const offer = await pc1.createOffer();

  await pc1.setLocalDescription(offer);
  await pc2.setRemoteDescription(offer);

  const answer = await pc2.createAnswer();

  await pc2.setLocalDescription(answer);
  await pc1.setRemoteDescription(answer);
}

// function createOffer() {
//   configuration = {
//     iceServers: [{ url: "stun:stun.l.google.com:19302" }]
//   };

//   // LocalConnection
//   pc = new RTCPeerConnection(configuration);
//   pc.createOffer().then(desc => {
//     pc.setLocalDescription(desc);
//     console.log("Offer", JSON.stringify(desc));
//   });
// }

// function createAnswer(sdp){
//   pc.createAnswer(sdp).then(desc => {
//     pc.setRemoteDescription(desc);
//     console.log("Pc remote answer", desc);

//   })

export default class Message extends React.Component {
  sendMessage() {
    var message = this.state.message;
    sendChannel.send(message);
  }

  render() {
    return (
      <View>
        {/* <Button title="Offer Button" onPress={() => createOffer()}></Button>
        <Button title="Answer Button" onPress={() => createAnswer(this.state.sdp)}></Button>
        <TextInput
          title="Enter your message"
          onChangeText={sdp => this.createAnswer(sdp)}
        ></TextInput>
        <Button title="Send" onPress={() => this.sendMessage()}></Button> */}
        <Button title="Start" onPress={() => start()}></Button>
        <RTCView
            objectFit="cover"
            style={{ flex: 2, backgroundColor: "#424242" }}
            streamURL={videoUrl}
          />
      </View>
    );
  }
}
