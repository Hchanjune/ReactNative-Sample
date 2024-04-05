import React, { useEffect } from "react";
import { Text, View } from "react-native";
import CommonStyles from "../styles/CommonStyles.tsx";
import { useLoading } from "../context/LoadingContext.tsx";


const InfoComponent = () => {
  const { startLoading, stopLoading } = useLoading();


  useEffect(() => {

  }, []);

  return (
    <View style={[CommonStyles.ContainerFlex, CommonStyles.backGroundPrimary50]}>
      <Text>정보화면입니다</Text>
    </View>
  );
}


export default InfoComponent
