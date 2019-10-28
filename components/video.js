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

function myCreateOffer() {
  console.log("Pc: ", pc);
  pc.createOffer().then(desc => {
    pc.setLocalDescription(desc).then(() => {
      console.log(
        "Pc local description: ",
        JSON.stringify(pc.localDescription)
      );
      pc.onicecandidate = e => {
        console.log("Pce on ice connection: ", JSON.stringify(e, null, 2));
        pc.setRemoteDescription(e);
      };
    });
  });
}

function connectionToPeer(desc) {
  const remotePc = new RTCPeerConnection(configuration);

  pc.setRemoteDescription(desc).then(() => {
    console.log("Remote stream", pc.getRemoteStreams);
  });
}

let isFront = true;

export default class Video extends React.Component {
  constructor() {
    super();
    this.state = {
      pc: pc,
      configuration: configuration,
      remoteUrl: null,
      test: null
    };
  }

  myGetUserMedia = () => {
    mediaDevices.enumerateDevices().then(sourceInfos => {
      console.log("Source Infos: ", sourceInfos);

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
          this.setState({ stream: stream });
          pc.setRemoteDescription;
          console.log("Stream: ", stream);
          console.log("Local video url: ", this.state.localVideoURL);
        })
        .catch(error => {
          // Log error
        });
    });
  };

  setVideo(offer) {
    this.setState({ remoteUrl: offer.toUrl() });
  }

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
            streamURL={this.state.remoteUrl}
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
          <Button
            onPress={() => connectionToPeer(this.state.test)}
            title="toPeer"
          >
            Connection to peer
          </Button>
          <TextInput
            placeholder="Video url"
            onChangeText={text => this.setState({ test: text })}
          />
        </View>
      </View>
    );
  }
}
