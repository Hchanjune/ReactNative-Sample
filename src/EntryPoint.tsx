import React, { useState } from "react";
import {PaperProvider} from "react-native-paper"
import Main from "./Main"
import { SnackbarProvider } from "./context/SnackbarContext.tsx";
import { LoadingProvider } from "./context/LoadingContext.tsx";

const EntryPoint: React.FC = () => {


  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };
  const hideSnackbar = () => setSnackbarVisible(false);

  return (
    <PaperProvider>
      <SnackbarProvider>
        <LoadingProvider>
          <Main />
        </LoadingProvider>
      </SnackbarProvider>
    </PaperProvider>
  )
}

export default EntryPoint
