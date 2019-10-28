import React from "react"
import { StyleSheet } from "react-native"
import { Colors } from "react-native/Libraries/NewAppScreen"

import Message from "./components/message"
import MessageV2 from "./components/messageV2"
import Video from "./components/video"

export default class App extends React.Component {
  render() {
    return (
      <MessageV2 />
    )
  }
}
