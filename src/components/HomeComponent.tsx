import React, {useEffect, useState} from "react";
import {View} from "react-native";
import {Text, Button} from "react-native-paper";
import CommonStyles from "../styles/CommonStyles.tsx";
import {useLoading} from "../context/LoadingContext.tsx";
import {NavigationTypes} from "../types/NavigationTypes.ts";
import {StackScreenProps} from "@react-navigation/stack";
import FastImage from "react-native-fast-image";
import {NavigationProp, RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {useGallery} from "../hooks/useGallery.ts";
import {useCamera} from "../hooks/useCamera.ts";
import CameraComponent from "./CameraComponent.tsx";

type HomeComponentProps = StackScreenProps<NavigationTypes, "HomeScreen">;
type HomeRouteProp = RouteProp<NavigationTypes, 'HomeScreen'>;
const HomeComponent: React.FC<HomeComponentProps> = () => {
    const navigation = useNavigation<NavigationProp<NavigationTypes>>();
    const {startLoading, stopLoading} = useLoading();

    // Camera
    const { isCameraOpen, openCamera, closeCamera, photoUri, setPhotoUri, onPhotoTaken } = useCamera();

    // Gallery
    const {openGallery, selectedGalleryImageUri, setSelectedGalleryImageUri} = useGallery();
    return (
        <View style={[CommonStyles.ContainerFlex, CommonStyles.backGroundPrimary50]}>
            <Button onPress={() => {openCamera(); console.log(isCameraOpen);}}>
                카메라 사진 찍기
            </Button>
            <CameraComponent isVisible={isCameraOpen} onPhotoTaken={onPhotoTaken} onClose={closeCamera} />
            {photoUri &&
                <>
                    <Text>사진찍은거</Text>
                    <FastImage
                        style={{width: 200, height: 200}}
                        source={{uri: photoUri}}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                    <Button onPress={() => {
                        setPhotoUri(null)
                    }}>지우기</Button>
                </>
            }


            <Button onPress={() => {
                openGallery();
            }}>앨범 사진 첨부</Button>

            {selectedGalleryImageUri &&
                <>
                    <Text>사진 선택한거</Text>
                    <FastImage
                        style={{width: 200, height: 200}}
                        source={{uri: selectedGalleryImageUri}}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                    <Button onPress={() => {
                        setSelectedGalleryImageUri(null)
                    }}>지우기</Button>
                </>
            }
        </View>
    );
}


export default HomeComponent
