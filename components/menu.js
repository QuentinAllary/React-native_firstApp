import React from "react";
import { StyleSheet, Text, TextInput, Button, View } from "react-native";
import FontAwesome, {
  SolidIcons,
  RegularIcons,
  BrandIcons
} from "react-native-fontawesome";

export default class Menu extends React.Component {
  render() {
    return (
      <>
        <Button title="Chat">Video</Button>
        <Button title="Video">Video</Button>
        <Button title="File">Video</Button>

      </>
    );
  }
}
