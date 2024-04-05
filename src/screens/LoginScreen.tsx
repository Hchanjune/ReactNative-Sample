import React, { useEffect, useState } from "react";
import { Alert, BackHandler, Keyboard, TouchableWithoutFeedback, View } from "react-native";
import LogoSvg  from '../assets/svg/rereLogoBadge.svg';
import CommonStyles from "../styles/CommonStyles.tsx";
import { Button, Text, TextInput, TouchableRipple } from "react-native-paper";
import { AuthenticationService } from "../services/login/AuthenticationService.ts";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { NavigationTypes } from "../types/NavigationTypes.ts";
import { UserRegistrationService } from "../services/userRegistration/UserResgistrationService.ts";
import { useLoading } from "../context/LoadingContext.tsx";
import { BackHandlerService } from "../services/BackHandlerService.tsx";
import JsonWebTokenStorageService from "../services/login/JsonWebTokenStorageService.ts";
import { JsonWebToken } from "../types/interface/JsonWebToken.ts";

const LoginScreen = () => {

  BackHandlerService.registerExitBackHandler()

  const {startLoading, stopLoading} = useLoading();

  const navigation = useNavigation<NavigationProp<NavigationTypes>>();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [resultMessage, setResultMessage] = useState('');

  const loginHandler = async () => {
    if (!id || !password) {
      setResultMessage('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }
    Keyboard.dismiss();
    startLoading();
    try {
      const loginData = await AuthenticationService.login(id, password);
      if (loginData.status === 'success') {
        // Store Tokens
        const tokens :JsonWebToken = JSON.parse(loginData.data);
        await JsonWebTokenStorageService.saveTokens(tokens)
        //navigation.navigate('HomeScreen');
        navigation.reset({
          index: 0,
          routes: [{name: 'HomeScreen'}],
        });
      }
    }  catch (error: any) {
        const errorMessage = AuthenticationService.loginException(error);
        setResultMessage(errorMessage);
    } finally {
      stopLoading();
    }
  }

  async function registrationScreenNavigate(){
    const request = await UserRegistrationService.getAvailableCompanyList();
    const companyNameList = UserRegistrationService.processCompanyNameListForSelect(request)
    // @ts-ignore
    navigation.navigate('UserRegisterScreen', { companyNameList : companyNameList })
  }



  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[CommonStyles.ContainerFlexCentered, CommonStyles.backGroundPrimary50]}>

        <View style={{flexDirection: `row`, alignItems: `center`, justifyContent: 'center', marginBottom: 20}}>
          <LogoSvg
            width={30}
            height={30}
            style={{marginRight: 10, marginBottom: 5}}
          />
          <Text
            variant="displaySmall"
            style={{fontFamily: "KOTRA_BOLD-Bold"}}
          >
            ReactNativeSample
          </Text>
        </View>


        <TextInput
          label="아이디"
          placeholder={"아이디를 입력하여주세요"}
          value={id}
          onChangeText={text => setId(text)}
          mode="outlined"
          outlineColor={"rgb(170, 170, 170)"}
          activeOutlineColor={"rgb(85, 114, 83)"}
          style={{marginBottom: 1, width: "100%" }}
        />

        <TextInput
          label="비밀번호"
          placeholder={"비밀번호를 입력하여 주세요"}
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry
          mode="outlined"
          outlineColor={"rgb(170, 170, 170)"}
          activeOutlineColor={"rgb(85, 114, 83)"}
          style={{ marginBottom: 10, width: "100%"}}
        />

        <Button
          mode="contained"
          buttonColor={"rgb(128, 128, 128)"}
          rippleColor={"rgb(155, 208, 151)"}
          style={{width: "100%", borderRadius: 5}}
          onPress={loginHandler}
        >
          로그인
        </Button>

        <Text
          style={{marginVertical: 8, color: "red"}}
        >
          {resultMessage}
        </Text>

        <TouchableRipple
          onPress={registrationScreenNavigate}
        >
          <Text
            style={{textDecorationLine: "underline"}}
          >
            사용자 신규 등록
          </Text>
        </TouchableRipple>

      </View>
    </TouchableWithoutFeedback>
  );
}


export default LoginScreen
