//@ts-nocheck
import React from 'react';
import { BottomNavigation, Text } from "react-native-paper";
import { View } from "react-native";
import HomeComponent from "./HomeComponent.tsx";
import MapComponent from "./maps/MapComponent.tsx";
import NfcComponent from "./NfcComponent.tsx";
import { NfcUtil } from "../utils/NfcUtil.ts";

const BottomNavBar = ({ onTabChange }) => {
  const [index, setIndex] = React.useState(1);
  const [routes] = React.useState([
    { key: 'map', title: 'Map', focusedIcon: 'map-legend', unfocusedIcon: 'map-outline'},
    { key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline'},
    { key: 'nfc', title: 'NFC', focusedIcon: 'cellphone-nfc', unfocusedIcon: 'nfc'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeComponent,
    map: MapComponent,
    nfc: () => <NfcComponent activeTab={index === 2} />,
  });

  const handleIndexChange = (selectedIndex) => {
    setIndex(selectedIndex);
    const selectedKey = routes[selectedIndex].key;
    if(onTabChange) onTabChange(selectedKey);
  };

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={handleIndexChange}
      renderScene={renderScene}
      sceneAnimationEnabled={true}
      sceneAnimationType="shifting"
      style={{backgroundColor:"green"}}
    />
  );
};

export default BottomNavBar;
