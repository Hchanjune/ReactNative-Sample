import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Snackbar } from "react-native-paper";

interface SnackbarContextType {
  showSnackbar: (message: string) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};

export const SnackbarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };

  const hideSnackbar = () => setSnackbarVisible(false);

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={hideSnackbar}
        duration={Snackbar.DURATION_SHORT}
        action={{
          label: '확인',
          onPress: () => {

          },
        }}
      >
        {snackbarMessage}
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
