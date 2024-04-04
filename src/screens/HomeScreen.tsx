// @ts-nocheck
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Text, Icon, IconButton } from "react-native-paper";
import CommonStyles from "../styles/CommonStyles.tsx";
import { useLoading } from "../context/LoadingContext.tsx";
import { BackHandlerService } from "../services/BackHandlerService.tsx";
import JsonWebTokenStorageService from "../services/login/JsonWebTokenStorageService.ts";


const HomeScreen = ({navigation}) => {
  BackHandlerService.registerExitBackHandler()
  const { startLoading, stopLoading } = useLoading();


  useEffect(() => {

  }, []);


  const logout = async () => {
    await JsonWebTokenStorageService.clearTokens();
    navigation.reset({
      index: 0,
      routes: [{name: 'LoginScreen'}],
    });
  }

  return (
    <View style={{flex:1, flexDirection: 'column'}}>
      <View style={[CommonStyles.header, CommonStyles.backGroundPrimary600]}>
        <IconButton icon={"menu"} size={30} onPress={()=>{}} />
        <Text>ReactNativeSample</Text>
        <IconButton icon={"logout-variant"} size={30} onPress={logout} />
      </View>
      <View style={[CommonStyles.ContainerFlex, CommonStyles.backGroundPrimary50]}>
        <Text>시스템에 오신것을 환영합니다.</Text>
      </View>
    </View>
  );
}


export default HomeScreen
