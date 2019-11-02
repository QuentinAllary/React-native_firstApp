import React from "react";
import { StyleSheet, View, Button, Text } from "react-native";
import AwesomeButtonRick from "react-native-really-awesome-button/src/themes/rick";
import { RNCamera } from "react-native-camera";

export default class Video extends React.Component {
  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
    }
  };

  render() {
    return (
      <>
        <View style={styles.container}>
          <AwesomeButtonRick
            type="secondary"
            onPress={() => this.takePicture()}
          >
            Test
          </AwesomeButtonRick>
          <Text style={styles.headerStyle}>Video</Text>
          <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style={{
              flex: 1,
            }}
            type={RNCamera.Constants.Type.front}
          ></RNCamera>
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
