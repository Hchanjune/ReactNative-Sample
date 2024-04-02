import React, { Component, useEffect, useState } from "react";
import { Text, View } from "react-native";
import CommonStyles from "../styles/CommonStyles.tsx";
import FastImage from "react-native-fast-image";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import {NavigationTypes} from "../types/NavigationTypes.ts";


const LoadingScreen = () => {

  const navigation = useNavigation<NavigationProp<NavigationTypes>>();

  useEffect(() => {
    setTimeout(()=>{
      navigation.navigate('LoginScreen');
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
