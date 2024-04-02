/*
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import CommonStyles from "../../styles/CommonStyles.tsx";


const LoginScreen = () => {


  const [value, setValue] = useState(0);
  const [text, setText] = useState('Value 변경안됨');

  useEffect(() => {
    if (value !== 0) {
      setText(`Value 변경됨!!! ${value}`);
    } else {
      setText(`Value 변경안됨`);
    }

  }, [value]);

  const btnClick = () => {
    setValue(prevValue => prevValue + 1);
  }

  const reset = () => {
    setValue(0);
  }

  return (
    <View style={CommonStyles.ContainerFlexCentered}>
      <Text>Login</Text>
      <Text>{text}</Text>
      <TouchableOpacity onPress={btnClick}>
        <Text>클릭하세요</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={reset}>
        <Text>초기화</Text>
      </TouchableOpacity>
    </View>
  );
}


export default LoginScreen
*/
