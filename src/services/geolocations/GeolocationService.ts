import Geolocation from 'react-native-geolocation-service';

// 사용자의 현재 위치를 가져오는 함수
export const watchLocation = (
  onSuccess: (position: any) => void, //
  onError: (error: Geolocation.GeoError) => void
) => {
  return Geolocation.watchPosition(onSuccess, onError, {
    enableHighAccuracy: true,
    distanceFilter: 1,
    interval: 1000,
  });
};

export const getCurrentLocation = (
  onSuccess: (position: Geolocation.GeoPosition) => void,
  onError: (error: Geolocation.GeoError) => void
) => {
  Geolocation.getCurrentPosition(onSuccess, onError, {
    enableHighAccuracy: true,
    timeout: 15000,
    maximumAge: 10000,
  });
};

export const GeolocationService = {
  getCurrentLocation,
  watchLocation,
}
