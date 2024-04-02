import React from "react";
import {PaperProvider} from "react-native-paper"
import Main from "./Main"

const EntryPoint = () => {
  return (
    <PaperProvider>
      <Main />
    </PaperProvider>
  )
}

export default EntryPoint
