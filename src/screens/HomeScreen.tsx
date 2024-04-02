import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import CommonStyles from "../styles/CommonStyles.tsx";


const HomeScreen = () => {


  return (
    <View style={[CommonStyles.ContainerFlexCentered, CommonStyles.backGroundPrimary50]}>
      <Text>시스템에 오신것을 환영합니다.</Text>
    </View>
  );
}


export default HomeScreen
