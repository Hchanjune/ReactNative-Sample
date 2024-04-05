import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const requestLocationPermission = async () => {
  try {
    const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    if (result === RESULTS.GRANTED) {
      console.log('위치 권한 허용됨');
    } else {
      console.log('위치 권한 거부됨');
    }
    return result === RESULTS.GRANTED;
  } catch (error) {
    console.warn(error);
  }
};

const requestCameraPermission = async () => {
  try {
    const result = await request(PERMISSIONS.ANDROID.CAMERA);
    if (result === RESULTS.GRANTED) {
      console.log('카메라 권한 허용됨');
    } else {
      console.log('카메라 권한 거부됨');
    }
    return result === RESULTS.GRANTED;
  } catch (error) {
    console.warn(error);
  }
};

const requestExternalStoragePermission = async () => {
  try {
    const image = await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
    if (image === RESULTS.GRANTED) {
      console.log('외부 저장소 읽기 권한 허용됨');
    } else {
      console.log('외부 저장소 읽기 권한 거부됨');
    }
    return image === RESULTS.GRANTED;
  } catch (error) {
    console.warn(error);
  }
};


export const AndroidPermissionsService = {
  requestLocationPermission,
  requestCameraPermission,
  requestExternalStoragePermission
}
