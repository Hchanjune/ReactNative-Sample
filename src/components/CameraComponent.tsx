import React, {useEffect, useRef} from 'react';
import {StyleSheet, View, TouchableOpacity, Text, Modal, BackHandler} from 'react-native';
import { Camera, useCameraDevices, CameraRuntimeError, useCameraDevice } from "react-native-vision-camera";
import {BackHandlerService} from "../services/BackHandlerService.tsx";

interface CameraComponentProps {
  isVisible: boolean;
  onPhotoTaken: (uri: string) => void;
  onClose: () => void;
}

const CameraComponent: React.FC<CameraComponentProps> = ({ isVisible, onPhotoTaken, onClose }) => {
  const device = useCameraDevice('back');
  const cameraRef = useRef<Camera>(null);

  useEffect(() => {
    if (isVisible) {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        onClose();
        return true;
      });

      return () => backHandler.remove();
    }
  }, [isVisible, onClose]);
/*  const takePhoto = async () => {
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
  };*/

  const takePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePhoto({});
      console.log(photo);
      onPhotoTaken(photo.path);
    }
  };

  if (device == null) return <View style={styles.container}><Text>No Camera Device Found</Text></View>;

  return (
      <Modal
          visible={isVisible}
          transparent={false}
          animationType="none"
          onRequestClose={onClose}
      >
        <View style={styles.container}>
          {device && (
              <Camera
                  ref={cameraRef}
                  style={StyleSheet.absoluteFill}
                  device={device}
                  enableZoomGesture={true}
                  photo={true}
                  isActive={true}
              />
          )}
          <TouchableOpacity onPress={takePhoto} style={styles.captureButton}>
            <View style={styles.innerCircle} />
          </TouchableOpacity>
        </View>
      </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100
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
