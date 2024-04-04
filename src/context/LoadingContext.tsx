import React, { createContext, useContext, useState, ReactNode } from 'react';
import CommonStyles from "../styles/CommonStyles.tsx";
import { View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";

interface LoadingContextType {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType>({} as LoadingContextType);

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const startLoading = (): void => setIsLoading(true);
  const stopLoading = (): void => setIsLoading(false);

  return (
    <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
      <>
        {children}
        {isLoading && (
          <View style={CommonStyles.disabledOverlay}>
            <ActivityIndicator size="large" color={"#0000ff"}/>
              <Text style={CommonStyles.textOutlined}>처리중입니다.</Text>
              <Text style={CommonStyles.textOutlined}> 잠시만 기다려주세요...</Text>
          </View>
        )}
      </>
    </LoadingContext.Provider>
  );
};
