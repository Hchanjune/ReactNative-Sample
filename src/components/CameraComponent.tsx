import React, { useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Camera, useCameraDevices, CameraRuntimeError, useCameraDevice } from "react-native-vision-camera";
import { NavigationTypes } from "../types/NavigationTypes.ts";
import { StackScreenProps } from "@react-navigation/stack";

type CameraComponentProps = StackScreenProps<NavigationTypes, "CameraComponent">;
const CameraComponent : React.FC<CameraComponentProps> = ({navigation}) => {
  const device = useCameraDevice('back');
  const cameraRef = useRef<Camera>(null);

  const takePhoto = async () => {
    if (cameraRef.current && device) {
      try {

        const photo = await cameraRef.current.takePhoto({});
        console.log(photo);
        navigation.navigate('HomeScreen', {photoUri: photo.path});
      } catch (error) {
        if (error instanceof CameraRuntimeError) {
          console.error(`Camera Error: ${error.message}`, error);
        } else {
          console.error("An unexpected error occurred while taking the photo.", error);
        }
      }
    }
  };

  if (device == null) return <View style={styles.container}><Text>No Camera Device Found</Text></View>;

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={device}
        enableZoomGesture={true}
        photo={true}
        isActive={true}
      />
      <TouchableOpacity onPress={takePhoto} style={styles.captureButton}>
        <View style={styles.innerCircle} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    position: 'absolute',
    bottom: 60,
    alignSelf: 'center',
    backgroundColor: 'transparent',
    borderRadius: 50,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 4,
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});

export default CameraComponent;
