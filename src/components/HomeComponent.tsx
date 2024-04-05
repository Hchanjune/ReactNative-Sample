import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Text, Icon, IconButton } from "react-native-paper";
import CommonStyles from "../styles/CommonStyles.tsx";
import { useLoading } from "../context/LoadingContext.tsx";

const HomeComponent = () => {
  const { startLoading, stopLoading } = useLoading();


  useEffect(() => {

  }, []);

  return (
    <View style={[CommonStyles.ContainerFlex, CommonStyles.backGroundPrimary50]}>
      <Text>시스템에 오신것을 환영합니다.</Text>
    </View>
  );
}


export default HomeComponent
