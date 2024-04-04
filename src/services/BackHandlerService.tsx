import { useEffect } from "react";
import { Alert, BackHandler } from "react-native";



function registerExitBackHandler() {
  useEffect(() => {
    const backAction = () => {
      Alert.alert("종료", "앱을 종료하시겠습니까?", [
        {
          text: "취소",
          onPress: () => null,
          style: "cancel"
        },
        { text: "확인", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
}


export const BackHandlerService = {
  registerExitBackHandler
}
