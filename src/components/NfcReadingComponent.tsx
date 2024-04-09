import React from "react";
import { Text, View } from "react-native";
import CommonStyles from "../styles/CommonStyles.tsx";
import FastImage from "react-native-fast-image";
import { Button } from "react-native-paper";

interface NfcReadingComponentProps {
  setReadingNfc: React.Dispatch<React.SetStateAction<boolean>>;
}

const NfcReadingComponent: React.FC<NfcReadingComponentProps> = ({setReadingNfc})=> {
  return (
    <View style={[CommonStyles.ContainerFlexCentered, CommonStyles.backGroundPrimary50]}>
      <FastImage
        style={{width:200, height:200}}
        source={require("../assets/gif/nfcReady.gif")}>
      </FastImage>
      <Text>NFC 태그를 감지중입니다...</Text>
      <Button onPress={()=>{
        setReadingNfc(false)
      }}>취소</Button>
    </View>
  );
}

export default NfcReadingComponent
