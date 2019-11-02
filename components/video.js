import React from "react";
import { StyleSheet, View, Button, Text } from "react-native";
import AwesomeButtonRick from "react-native-really-awesome-button/src/themes/rick";
import { RNCamera, FaceDetector } from "react-native-camera";

export default class Video extends React.Component {
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
          <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            androidCameraPermissionOptions={{
              title: "Permission to use camera",
              message: "We need your permission to use your camera",
              buttonPositive: "Ok",
              buttonNegative: "Cancel"
            }}
            androidRecordAudioPermissionOptions={{
              title: "Permission to use audio recording",
              message: "We need your permission to use your audio",
              buttonPositive: "Ok",
              buttonNegative: "Cancel"
            }}
          />
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
