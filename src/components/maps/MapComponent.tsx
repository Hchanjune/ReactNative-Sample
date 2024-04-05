import { useLoading } from "../../context/LoadingContext.tsx";
import React, { useEffect, useRef, useState } from "react";
import CommonStyles from "../../styles/CommonStyles.tsx";
import { Alert, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import WebView, { WebViewMessageEvent } from "react-native-webview";
import { GeolocationService } from "../../services/geolocations/GeolocationService.ts";
import Geolocation from "react-native-geolocation-service";

const MapComponent = () => {
  const [initLocation, setInitLocation] = useState({ latitude: 0, longitude: 0 });
  const [currentLocation, setCurrentLocation] = useState({ latitude: 0, longitude: 0 });
  const { startLoading, stopLoading } = useLoading();
  const webViewRef = useRef<WebView | null>(null);

  // 최초좌표 설정
  useEffect(() => {
    GeolocationService.getCurrentLocation(
      (position) => {
        const { latitude, longitude } = position.coords;
        setInitLocation({ latitude, longitude });
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  // 현재 좌표 추적
  useEffect(() => {
    const watchId = GeolocationService.watchLocation(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude }); //
        webViewRef.current?.postMessage(JSON.stringify({ latitude, longitude }));
      },
      (error) => {
        console.error(error);
      }
    );
    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, []);

  const mapHtml = initHtml(initLocation.latitude, initLocation.longitude);
  function initHtml(lat: number, lng: number){
    return `
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=3334a651fd8807572ba173d912f11709&libraries=services,clusterer,drawing,geometry"></script> 
        <!-- jQuery 3.7.1 CDN -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
      </head>
      <style>
        .glass-simple {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(5px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          padding: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      .map-control-bottom-right{
          position: absolute;
          bottom: 35px;
          right: 20px;
          margin: 0;
          padding: 0;
          z-index: 99;
      }
      </style>
      <body >
        <div>
          <div class='map-control-bottom-right glass-simple'>
            <img id="currentLocationBtn" src="https://cdn2.iconfinder.com/data/icons/boxicons-regular-vol-2/24/bx-current-location-512.png" style="width: 30px; height:30px;">
          </div>
          <div id="map" style="width:100%; height:100%;"></div>
          <button id="btn" style="display:none">Send</button>
          <sapn id="message" style="display:none">위경도</sapn>
        </div>
        
        <script type="text/javascript">
          $(function() {
            const container = document.getElementById('map');
            
            const options = { 
                center: new kakao.maps.LatLng(${lat}, ${lng}),
                level: 3
            };
            
            const map = new kakao.maps.Map(container, options);
            
            const mapTypeControl = new kakao.maps.MapTypeControl();
            
            map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
            
            let imageSrc = 'https://cdn0.iconfinder.com/data/icons/Puck_Icons_Pack_II_by_deleket/300/Windows_Turn_Off.png';  
            let imageSize = new kakao.maps.Size(12, 12);
            let imageOption = {offset: new kakao.maps.Point(6, 6)};
            
            let currentLocationMarker = new kakao.maps.Marker({
                position: new kakao.maps.LatLng(${lat}, ${lng}),
                map: map,
                image: new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)
            });

            const geocoder = new kakao.maps.services.Geocoder();
            

            let customTileset = new kakao.maps.Tileset(256, 256, (x, y, z) => {
                let minX = calculateTileMinX(x, z);
                let minY = calculateTileMinY(y, z);
                let maxX = calculateTileMaxX(x, z);
                let maxY = calculateTileMaxY(y, z);
                let minCoords = convertWMT2WGS84(minX, minY);
                let maxCoords = convertWMT2WGS84(maxX, maxY);
                let resultURL = 'http://snd.synology.me:8081/map/customTile/api?minLongitude=' + minCoords.x.toFixed(6) + '&minLatitude=' + minCoords.y.toFixed(6) + '&maxLongitude=' + maxCoords.x.toFixed(6) + '&maxLatitude=' + maxCoords.y.toFixed(6);
                return resultURL;
            }, [], false, 2, 5);
            kakao.maps.Tileset.add('CUSTOM_TILE', customTileset);
            map.addOverlayMapTypeId(kakao.maps.MapTypeId.CUSTOM_TILE);
            
            $('#btn').off('click').on('click', function(event){
              event.preventDefault();
              window.ReactNativeWebView.postMessage(JSON.stringify({id : "hello"}));
            });
            
            document.addEventListener('message', function(event) {
              const message = JSON.parse(event.data);
              const { latitude, longitude } = message;
              $('#message').html('위도=' + message.latitude.toString() + ' / 경도=' + message.longitude.toString());
              const location = new kakao.maps.LatLng(message.latitude, message.longitude);
              currentLocationMarker.setPosition(location);
            });
            
            $('#currentLocationBtn').off('click').on('click', function(event){
              event.preventDefault();
              if (currentLocationMarker) {
                map.panTo(currentLocationMarker.getPosition());
              }
            });
            
          });
          
          function calculateTileMinX(tileX, zoomLevel){
              return tileX * Math.pow(2, zoomLevel - 3) * 256 - 30000;
          }
          function calculateTileMinY(tileY, zoomLevel){
              return tileY * Math.pow(2, zoomLevel - 3) * 256 - 60000;
          }
          function calculateTileMaxX(tileX, zoomLevel){
              return (tileX + 1) * Math.pow(2, zoomLevel - 3) * 256 - 30000;
          }
          function calculateTileMaxY(tileY, zoomLevel){
              return (tileY + 1) * Math.pow(2, zoomLevel - 3) * 256 - 60000;
          }
          function convertWMT2WGS84(x, y) {
              let coordinatesUtil = new kakao.maps.Coords(x * 2.5 , y * 2.5);
              let latLng = coordinatesUtil.toLatLng();
              return { x : latLng.getLng(), y : latLng.getLat()};
          }
        </script>       
    </body>
    </html>
  `;
  }

  const onMessage = (event: WebViewMessageEvent) => {
    const data = JSON.parse(event.nativeEvent.data);
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ html: mapHtml }}
        style={styles.webView}
        originWhitelist={['*']}
        onMessage={onMessage}
      />
      {/*<Text>현재 위치: 위도 {currentLocation.latitude}, 경도 {currentLocation.longitude}</Text>*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webView: {
    flex: 1,
  },
});

export default MapComponent
