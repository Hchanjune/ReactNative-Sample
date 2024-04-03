import React, { useState } from "react";
import {PaperProvider} from "react-native-paper"
import Main from "./Main"
import { SnackbarProvider } from "./components/snackbar/SnackbarContext.tsx";

const EntryPoint = () => {
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Snackbar를 표시하는 함수
  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };

  // Snackbar를 숨기는 함수
  const hideSnackbar = () => setSnackbarVisible(false);

  return (
    <PaperProvider>
      <SnackbarProvider>
        <Main />
      </SnackbarProvider>
    </PaperProvider>
  )
}

export default EntryPoint
