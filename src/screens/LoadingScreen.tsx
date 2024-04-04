import React, { Component, useEffect, useState } from "react";
import { Alert, BackHandler, Text, View } from "react-native";
import CommonStyles from "../styles/CommonStyles.tsx";
import FastImage from "react-native-fast-image";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import {NavigationTypes} from "../types/NavigationTypes.ts";
import { BackHandlerService } from "../services/BackHandlerService.tsx";
import JsonWebTokenStorageService from "../services/login/JsonWebTokenStorageService.ts";
import { AuthenticationService } from "../services/login/AuthenticationService.ts";


const LoadingScreen = () => {

  BackHandlerService.registerExitBackHandler()

  const navigation = useNavigation<NavigationProp<NavigationTypes>>();

  useEffect(() => {

    const tokenValidationCheck = async () => {
      return await AuthenticationService.tokenValidation();
    }



    setTimeout(async ()=>{
      //navigation.navigate('LoginScreen');
      navigation.reset({
        index: 0,
        routes: [{name: await tokenValidationCheck() ? 'HomeScreen' : 'LoginScreen'}],
      });
      if (!await tokenValidationCheck()) {
        //로그인 만료 메시지
      }
    }, 3000);
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
