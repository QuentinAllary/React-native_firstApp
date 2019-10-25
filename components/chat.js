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

const configuration = { iceServers: [{ url: "stun:stun.l.google.com:19302" }] };
const pc = new RTCPeerConnection(configuration);
const pc2 = new RTCPeerConnection(configuration);

function myCreateOffer() {
  console.log("======= Pc =======");
  console.log(pc);
  pc.createOffer().then(desc => {
    pc.setLocalDescription(desc).then(() => {
      console.log("======= Pc local description =======");
      console.log(JSON.stringify(pc.localDescription));
      sendChannel = pc.createDataChannel("sendChannel");
      pc.onicecandidate = e => {
        console.log("======= Pc OnIceCandidate (e) =======");
        console.log(JSON.stringify(e, null, 2));
        pc.setRemoteDescription(e);
      };
    });
  });
}

function connectionToPeer(offer) {
  pc.createAnswer(offer).then(desc => {
    pc.setRemoteDescription(desc);
  })
}
let isFront = true;

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      text: "SIMON",
      pc: pc,
      configuration: configuration
    };
  }

  myGetUserMedia = () => {
    mediaDevices.enumerateDevices().then(sourceInfos => {
      console.log("======= Source Infos =======");
      console.log(sourceInfos);

      let videoSourceId;
      for (let i = 0; i < sourceInfos.length; i++) {
        const sourceInfo = sourceInfos[i];
        if (
          sourceInfo.kind == "videoinput" &&
          sourceInfo.facing == (isFront ? "front" : "back")
        ) {
          videoSourceId = sourceInfo.deviceId;
        }
      }
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
            optional: videoSourceId ? [{ sourceId: videoSourceId }] : []
          }
        })
        .then(stream => {
          this.setState({ localVideoURL: stream.toURL() });
          console.log("======= Stream =======");
          console.log(JSON.stringify(stream, null, 2));

          console.log("======= localVideoUrl =======");
          console.log(this.state.localVideoURL);
        })
        .catch(error => {
          // Log error
        });
    });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Button onPress={() => myCreateOffer()} title="create offer"></Button>
        <Button
          onPress={() => this.myGetUserMedia()}
          title="get user media"
        ></Button>
        <View style={{ flex: 2 }}>
          <RTCView
            objectFit="cover"
            style={{ flex: 2, backgroundColor: "#424242" }}
            streamURL={this.state.remoteVideoURL}
          />
        </View>
        <View style={{ flex: 1 }}>
          <RTCView
            objectFit="cover"
            style={{ flex: 1, backgroundColor: "#424242" }}
            streamURL={this.state.localVideoURL}
          />
        </View>
        <View>
          <TextInput
            placeholder="Video url"
            onChangeText={text => connectionToPeer(text)}
          />
        </View>
      </View>
    );
  }
}
