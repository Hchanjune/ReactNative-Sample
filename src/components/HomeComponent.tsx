import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Text, Button } from "react-native-paper";
import CommonStyles from "../styles/CommonStyles.tsx";
import { useLoading } from "../context/LoadingContext.tsx";
import { NavigationTypes } from "../types/NavigationTypes.ts";
import { StackScreenProps } from "@react-navigation/stack";
import FastImage from "react-native-fast-image";
import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";

type HomeComponentProps = StackScreenProps<NavigationTypes, "HomeScreen">;
type HomeRouteProp = RouteProp<NavigationTypes, 'HomeScreen'>;
const HomeComponent : React.FC<HomeComponentProps> = () => {
  const navigation = useNavigation<NavigationProp<NavigationTypes>>();
  const { startLoading, stopLoading } = useLoading();

  const route = useRoute<HomeRouteProp>();
  const [photoUri, setPhotoUri] = useState('');

  useEffect(() => {
    if (route.params?.photoUri) {
      const fileUri = `file://${route.params.photoUri}`;
      setPhotoUri(fileUri);
      console.log("Photo URI: ", route.params.photoUri); // 콘솔에 photoUri 출력
    }
  }, [route.params?.photoUri]);




  return (
    <View style={[CommonStyles.ContainerFlex, CommonStyles.backGroundPrimary50]}>
      <Text>시스템에 오신것을 환영합니다.</Text>
      <Button onPress={()=>{
        navigation.navigate('CameraComponent');
      }}>카메라 사진 찍기</Button>
      <Button>앨범 사진 첨부</Button>
      <Text>사진</Text>
      {photoUri &&
        <FastImage
          style={{ width: 200, height: 200 }}
          source={{ uri: photoUri }}
          resizeMode={FastImage.resizeMode.contain}
        />
      }
    </View>
  );
}


export default HomeComponent
