import React, { Component, useEffect, useState } from "react";
import { Alert, BackHandler, Text, View } from "react-native";
import CommonStyles from "../styles/CommonStyles.tsx";
import FastImage from "react-native-fast-image";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import {NavigationTypes} from "../types/NavigationTypes.ts";
import { BackHandlerService } from "../services/BackHandlerService.tsx";
import { AuthenticationService } from "../services/login/AuthenticationService.ts";
import NetInfo from "@react-native-community/netinfo";
import { AndroidPermissionsService } from "../services/permissions/AndroidPermissionsService.tsx";


const LoadingScreen = () => {

  BackHandlerService.registerExitBackHandler()

  const navigation = useNavigation<NavigationProp<NavigationTypes>>();

  useEffect(() => {
    const prepareApp = async () => {
      const netState = await NetInfo.fetch();
      if (!netState.isConnected) {
        Alert.alert("인터넷 연결 오류", "인터넷에 연결되어 있지 않습니다.");
        return;
      }

      // 권한 요청
      const locationGranted = await AndroidPermissionsService.requestLocationPermission();
      const cameraGranted = await AndroidPermissionsService.requestCameraPermission();
      //const storageGranted = await AndroidPermissionsService.requestExternalStoragePermission();

      // 하나라도 권한이 거부된 경우
      if (!locationGranted || !cameraGranted) {
        Alert.alert("권한 오류", "앱에서 필요한 권한을 허용해주세요.");
        return;
      }

      // 토큰 유효성 검사
      const isAuthenticated = await AuthenticationService.tokenValidation();
      navigation.reset({
        index: 0,
        routes: [{ name: isAuthenticated ? 'HomeScreen' : 'LoginScreen' }],
      });
    };

    prepareApp();
  }, [navigation]);



  return (
    <View style={[CommonStyles.ContainerFlexCentered, CommonStyles.backGroundPrimary50]}>
      <FastImage
        style={{width:200, height:200}}
        source={require("../assets/gif/loadingSpinnerPulse.gif")}>
      </FastImage>
      <Text>시스템을 초기화중입니다</Text>
      <Text>잠시만 기다려주세요...</Text>
    </View>
  );
}


export default LoadingScreen
