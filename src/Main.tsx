import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import LoadingScreen from "./screens/LoadingScreen.tsx";
import LoginScreen from "./screens/LoginScreen.tsx";
import MainContainerScreen from "./screens/MainContainerScreen.tsx";
import UserRegisterScreen from "./screens/UserRegisterScreen.tsx";
import CameraComponent from "./components/CameraComponent.tsx"
import { NavigationTypes } from "./types/NavigationTypes.ts";

const Stack = createNativeStackNavigator<NavigationTypes>();
const Main : React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoadingScreen">
        <Stack.Screen name="LoadingScreen" component={LoadingScreen} options={{headerShown: false}}/>
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="UserRegisterScreen" component={UserRegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreen" component={MainContainerScreen} options={{ headerShown: false }} />


    </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;
