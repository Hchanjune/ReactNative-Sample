// @ts-nocheck
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Text, Icon, IconButton } from "react-native-paper";
import CommonStyles from "../styles/CommonStyles.tsx";
import { useLoading } from "../context/LoadingContext.tsx";
import { BackHandlerService } from "../services/BackHandlerService.tsx";
import JsonWebTokenStorageService from "../services/login/JsonWebTokenStorageService.ts";
import BottomNavBar from "../components/BottomNavigation.tsx";


const MainContainerScreen = ({navigation}) => {
  BackHandlerService.registerExitBackHandler();

  const { startLoading, stopLoading } = useLoading();

  const [selectedTab, setSelectedTab] = useState('home');
  useEffect(() => {

  }, [selectedTab]);


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
      <BottomNavBar onTabChange={(key) => setSelectedTab(key)} />
    </View>
  );
}


export default MainContainerScreen
