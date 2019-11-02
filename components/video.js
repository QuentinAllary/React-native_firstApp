import React from "react";
import { StyleSheet, View, Button, Text } from "react-native";
import { RTCView, mediaDevices } from "react-native-webrtc";
import AwesomeButtonRick from "react-native-really-awesome-button/src/themes/rick";

export default class Video extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      localVideoURL: null
    };
  }

  getLocalVideo() {
    let isFront = true;
    mediaDevices.enumerateDevices().then(sourceInfos => {
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
        })
        .catch(error => {
          // Log error
        });
    });
  }
  render() {
    return (
      <>
        <View style={styles.container}>
          <Text style={styles.headerStyle}>Video</Text>
          <AwesomeButtonRick
                type="secondary"
                onPress={() => this.getLocalVideo()}
              >
                Test
              </AwesomeButtonRick>
          <RTCView streamURL={this.state.localVideoURL} />
          
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    // flexDirection: "row",
    // justifyContent: "flex-start",
    // backgroundColor: "green"
  },
  headerStyle: {
    fontSize: 36,
    textAlign: "center",
    fontWeight: "100",
    marginBottom: 24
  }
});
