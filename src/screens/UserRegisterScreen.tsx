import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import CommonStyles from "../styles/CommonStyles.tsx";
import { Button, Card, Text, TextInput } from "react-native-paper";
import DropDownPicker from 'react-native-dropdown-picker';
import { UserRegistrationService } from "../services/userRegistration/UserResgistrationService.ts";
import Icon from "react-native-vector-icons/FontAwesome";
import { NavigationTypes } from "../types/NavigationTypes.ts";
import { useSnackbar } from "../components/snackbar/SnackbarContext.tsx";

type UserRegisterScreenProps = StackScreenProps<NavigationTypes, "UserRegisterScreen">;
const UserRegisterScreen : React.FC<UserRegisterScreenProps> = ({navigation, route}) => {

  const { showSnackbar } = useSnackbar();

  const [formStatus, setFormStatus] = useState({
    id : false,
    idCheck: true,
    password: false,
    passwordCheck: false,
    name: false,
    company: false,
    phone: false,
    email: false,
  });
  const [formMessage, setFormMessage] = useState({
    text: '모든 정보를 입력하여주세요.',
    color: 'rgb(128, 128, 128)',
    registerFunction : () => {}
  });
  useEffect(() => {
    const formReady = Object.values(formStatus).every(value => value);
      setFormMessage({
        text: formReady ? '사용자 등록' : '모든 정보를 입력하여주세요',
        color: formReady? 'green' : 'rgb(128, 128, 128)',
        registerFunction: formReady? registerRequest : ()=>{}
      });
  }, [formStatus]);

  const [id, setId] = useState('');
  const [idValidationMessage, setIdValidationMessage] = useState({
    text : '',
    color: 'rgb(170, 170, 170)'
  });
  useEffect(()=> {
    if (id.length === 0) {
      setIdValidationMessage(prevState=> ({
        ...prevState,
        text: '',
        color: 'rgb(170, 170, 170)'
      }));
      setFormStatus(prevState => ({
        ...prevState,
        id: false
      }));
      return;
    }
    const idValidation = UserRegistrationService.validateId(id);
    setIdValidationMessage(prevState=> ({
      ...prevState,
      text: idValidation ? '유효한 아이디 형식입니다.' : '아이디: 영소문자로 시작하고 영소문자 또는 숫자로 이루어진 3~19자의 문자열',
      color: idValidation ? 'green' : 'red'
    }));
    setFormStatus(prevState => ({
      ...prevState,
      id: idValidation
    }));
  }, [id])

  const [password, setPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(true)
  const [passwordValidationMessage, setPasswordValidationMessage] = useState({
    text: '',
    color: 'rgb(170, 170, 170)'
  });
  useEffect(()=> {
    if (password.length === 0) {
      setPasswordValidationMessage(prevState => ({
        ...prevState,
        text: '',
        color: 'rgb(170, 170, 170)'
      }));
      setFormStatus(prevState => ({
        ...prevState,
        password: false
      }));
      return;
    }
    const passwordValidation = UserRegistrationService.validatePassword(password);
    setPasswordValidationMessage(prevState => ({
      ...prevState,
      text: passwordValidation? '유효한 비밀번호 형식입니다.' : '비밀번호: 최소 10자리 이상의 영어 대문자, 소문자, 숫자, 특수문자 중 2종류 조합',
      color: passwordValidation? 'green' : 'red'
    }));
    setFormStatus(prevState => ({
      ...prevState,
      password: passwordValidation
    }));
  }, [password])

  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordCheckVisibility, setPasswordCheckVisibility] = useState(true)
  const [passwordCheckMessage, setPasswordCheckMessage] = useState({
    text: '',
    color: 'rgb(170, 170, 170)'
  });
  useEffect(() => {
    if (password.length ===0 && passwordCheck.length === 0) {
      setPasswordCheckMessage(prevState => ({
        ...prevState,
        text: '',
        color: 'rgb(170, 170, 170)'
      }));
      setFormStatus(prevState => ({
        ...prevState,
        passwordCheck: false
      }));
    } else {
      const passwordCheckValidation = UserRegistrationService.validatePasswordCheck(password, passwordCheck)
      setPasswordCheckMessage(prevState => ({
        ...prevState,
        text: passwordCheckValidation ? '비밀번호가 일치합니다.' : '비밀번호가 일치하지 않거나 조건을 충족하지 못하였습니다.',
        color: passwordCheckValidation ? 'green' : 'red'
      }));
      setFormStatus(prevState => ({
        ...prevState,
        passwordCheck: passwordCheckValidation
      }));
    }
  }, [password, passwordCheck]);

  const [name, setName] = useState('');
  const [nameValidationMessage, setNameValidationMessage] = useState({
    text: '',
    color: 'rgb(170, 170, 170)'
  });
  useEffect(() => {
    if (name.length === 0) {
      setNameValidationMessage(prevState => ({
        ...prevState,
        text: '',
        color: 'rgb(170, 170, 170)'
      }));
      setFormStatus(prevState => ({
        ...prevState,
        name: false
      }));
      return;
    }
    const nameValidation = UserRegistrationService.validateNameCheck(name);
    setNameValidationMessage(prevState => ({
      ...prevState,
      text: nameValidation? '유효한 이름 형식입니다.' : '이름: 최소 1글자 이상의 한글문자.',
      color: nameValidation? 'green' : 'red'
    }));
    setFormStatus(prevState => ({
      ...prevState,
      name: nameValidation
    }));
  }, [name]);

  const [companySelectOpen, setCompanySelectOpen] = useState(false);
  const [companySelectValue, setCompanySelectValue] = useState(null);
  //@ts-ignore
  const [companySelectItems, setCompanySelectItems] = useState(
    route.params.companyNameList
  );
  const [companyValidationMessage, setCompanyValidationMessage] = useState({
    text : '',
    color: 'rgb(170, 170, 170)'
  });
  useEffect(() => {
    if (companySelectValue === 'default') {
      setCompanyValidationMessage(prevState => ({
        ...prevState,
        text: '정확한 소속을 반드시 선택하여주세요.',
        color: 'red'
      }));
      setFormStatus(prevState => ({
        ...prevState,
        company: false
      }));
      return;
    }
    const companyValidation = companySelectValue !== null && companySelectValue !== '';
    setCompanyValidationMessage(prevState => ({
      ...prevState,
      text: companyValidation? '소속이 정확한지 다시한번 확인하여주세요.' : '',
      color: companyValidation? 'green' : 'red'
    }));
    setFormStatus(prevState => ({
      ...prevState,
      company: companyValidation
    }));
  }, [companySelectValue]);

  const [phone, setPhone] = useState('');
  const [phoneValidationMessage, setPhoneValidationMessage] = useState({
    text: '',
    color: 'rgb(170, 170, 170)'
    });
  useEffect(() => {
    if (phone.length === 0) {
      setPhoneValidationMessage(prevState => ({
        ...prevState,
        text: '',
        color: 'rgb(170, 170, 170)'
      }));
      setFormStatus(prevState => ({
        ...prevState,
        phone: false
      }));
      return;
    }
    const phoneValidation = UserRegistrationService.validatePhoneCheck(phone);
    setPhoneValidationMessage(prevState => ({
      ...prevState,
      text: phoneValidation? '유효한 형식의 전화번호 입니다' : '전화번호: 02로 시작시 8글자 이상, 그 이외의 경우 9글자 이상의 숫자',
      color: phoneValidation? 'green' : 'red'
    }));
    setFormStatus(prevState => ({
      ...prevState,
      phone: phoneValidation
    }));
  }, [phone]);

  const [email, setEmail] = useState('');
  const [emailValidationMessage, setEmailValidationMessage] = useState({
    text: '',
    color: 'rgb(170, 170, 170)'
  });
  useEffect(() => {
    if (email.length === 0) {
      setEmailValidationMessage(prevState => ({
        ...prevState,
        text: '',
        color: 'rgb(170, 170, 170)'
      }));
      setFormStatus(prevState => ({
        ...prevState,
        email: false
      }));
      return;
    }
    const emailValidation = UserRegistrationService.validateEmailCheck(email);
    setEmailValidationMessage(prevState => ({
      ...prevState,
      text: emailValidation? `[${email}] 유효한 형식입니다` : '이메일: example@example.com 과 같은 이메일 형식.',
      color: emailValidation? 'green' : 'red'
    }));
    setFormStatus(prevState => ({
      ...prevState,
      email: emailValidation
    }));
  }, [email]);


  function serializeRegisterForm() {
    return {
      id: id,
      password: password,
      passwordCheck: passwordCheck,
      name: name,
      company: companySelectValue,
      phone: phone,
      email: email
    }
  }

  async function registerRequest(){
    const formData = serializeRegisterForm();
    const isIdAvailable = await UserRegistrationService.checkDuplicatedIdRequest(formData.id)
    console.log(isIdAvailable);
    if (!isIdAvailable.data) {
      const registerProcess = await UserRegistrationService.registerUserRequest(formData);
      console.log(registerProcess);
      if (registerProcess.data) {
        navigation.navigate('LoginScreen');
        showSnackbar('가입이 성공적으로 이루어졌습니다.');
      } else {
        showSnackbar('네트워크 상태가 좋지 않습니다.');
      }
    } else {
      showSnackbar('사용 할 수 없는 ID 입니다. ID를 변경해주세요.');
      setIdValidationMessage(prevState=> ({
        ...prevState,
        text: '사용 할 수 없는 ID 입니다. ID를 변경해주세요.',
        color: 'red'
      }));
      setFormStatus(prevState => ({
        ...prevState,
        id: false
      }));
    }
  }

  // @ts-ignore
  return(
    <View style={[CommonStyles.ContainerFlexCentered, CommonStyles.backGroundPrimary50]}>
      <ScrollView
        contentContainerStyle={{ alignItems: 'center', maxWidth: '100%'}}
      >
        <Card
          mode={"outlined"}
          style={{width: '100%', marginTop: 25, marginBottom: 15, backgroundColor: "rgb(244, 249, 250)"}}
        >
          <Card.Title title={"신규사용자 등록"} style={{width: '100%'}} />
          <TextInput
            label="사용자 ID"
            placeholder={"사용자 ID를 입력하여주세요."}
            value={id}
            maxLength={20}
            onChangeText={idString => setId(idString)}
            mode="outlined"
            outlineColor={idValidationMessage.color} //{"rgb(170, 170, 170)"}
            activeOutlineColor={idValidationMessage.color} //{"rgb(85, 114, 83)"}
            style={{marginHorizontal: 10, marginBottom: 1}}
            left={<TextInput.Icon icon={"account-outline"}  />}
          />
          <Text style={{ marginHorizontal: 25, marginBottom: 3, color: idValidationMessage.color }}>{idValidationMessage.text}</Text>

          <TextInput
            label="비밀번호"
            placeholder={"비밀번호를 입력하여주세요."}
            value={password}
            maxLength={40}
            onChangeText={passwordString => setPassword(passwordString)}
            mode="outlined"
            outlineColor={passwordValidationMessage.color}
            activeOutlineColor={passwordValidationMessage.color}
            style={{marginHorizontal: 10, marginBottom: 1}}
            secureTextEntry={passwordVisibility}
            left={<TextInput.Icon icon={"shield-lock-outline"} onPress={()=>{}} />}
            right={<TextInput.Icon icon={passwordVisibility ? "eye" : "eye-off"} onPress={() => setPasswordVisibility(!passwordVisibility)} />}
          />
          <Text style={{marginHorizontal: 25, marginBottom: 3, color: passwordValidationMessage.color}}>{passwordValidationMessage.text}</Text>

          <TextInput
            label="비밀번호 확인"
            placeholder={"비밀번호를 다시한번 입력하여주세요."}
            value={passwordCheck}
            maxLength={40}
            onChangeText={passwordCheck => setPasswordCheck(passwordCheck)}
            mode="outlined"
            outlineColor={passwordCheckMessage.color}
            activeOutlineColor={passwordCheckMessage.color}
            style={{marginHorizontal: 10, marginBottom: 1}}
            secureTextEntry={passwordCheckVisibility}
            left={<TextInput.Icon icon={"shield-lock"} />}
            right={<TextInput.Icon icon={passwordCheckVisibility ? "eye" : "eye-off"} onPress={() => setPasswordCheckVisibility(!passwordCheckVisibility)} />}
          />
          <Text style={{marginHorizontal: 25, marginBottom: 3, color: passwordCheckMessage.color}}>{passwordCheckMessage.text}</Text>

          <TextInput
            label="이름"
            placeholder={"이름을 입력하여주세요."}
            value={name}
            maxLength={20}
            onChangeText={name => setName(name)}
            mode="outlined"
            outlineColor={nameValidationMessage.color}
            activeOutlineColor={nameValidationMessage.color}
            style={{marginHorizontal: 10, marginBottom: 1}}
            left={<TextInput.Icon icon={"card-account-details-outline"} />}
          />
          <Text style={{marginHorizontal: 25, marginBottom: 3, color: nameValidationMessage.color}}>{nameValidationMessage.text}</Text>

          <View style={CommonStyles.selectViewWithTitle}>
            <Icon name={"building"} size={20} color={"#000"} style={{marginHorizontal: 20, marginVertical: 15}}/>
            <Text style={{marginRight: 5}}>소속</Text>

            <DropDownPicker
              placeholder={"소속을 선택하여주세요"}
              open={companySelectOpen}
              value={companySelectValue}
              items={companySelectItems}
              setOpen={setCompanySelectOpen}
              setValue={setCompanySelectValue}
              setItems={setCompanySelectItems}
              closeOnBackPressed={true}
              listMode="SCROLLVIEW"
              scrollViewProps={{
                nestedScrollEnabled: true,
              }}
              style={{width: '74%', borderColor: "transparent", margin: 1}}
              dropDownContainerStyle={{width: '74%', borderColor: "rgb(170, 170, 170)"}}
            />
          </View>
          <Text style={{marginHorizontal: 25, marginBottom: 3, color: companyValidationMessage.color}}>{companyValidationMessage.text}</Text>

          <TextInput
            label="전화번호"
            placeholder={"연락 가능한 전화번호를 입력하여주세요."}
            value={phone}
            maxLength={20}
            keyboardType={"phone-pad"}
            onChangeText={phone => setPhone(phone)}
            mode="outlined"
            outlineColor={phoneValidationMessage.color}
            activeOutlineColor={phoneValidationMessage.color}
            style={{marginHorizontal: 10, marginBottom: 1}}
            left={<TextInput.Icon icon={"phone-outline"} />}
          />
          <Text style={{marginHorizontal: 25, marginBottom: 3, color: phoneValidationMessage.color}}>{phoneValidationMessage.text}</Text>

          <TextInput
            label="이메일"
            placeholder={"이메일을 입력하여주세요."}
            value={email}
            maxLength={60}
            keyboardType={"email-address"}
            onChangeText={email => setEmail(email)}
            mode="outlined"
            outlineColor={emailValidationMessage.color}
            activeOutlineColor={emailValidationMessage.color}
            style={{marginHorizontal: 10, marginBottom: 1}}
            left={<TextInput.Icon icon={"email-outline"} />}
          />
          <Text style={{marginHorizontal: 25, marginBottom: 3, color: emailValidationMessage.color}}>{emailValidationMessage.text}</Text>

          <Card.Actions
            style={{alignItems: 'center'}}
          >
            <Button
              mode="contained"
              buttonColor={formMessage.color}
              onPress={formMessage.registerFunction}
              labelStyle={{width: "100%"}}
              style={{height: 45, width: "100%", borderRadius: 5, marginBottom: 25, alignItems: 'center', justifyContent: 'center'}}
            >
              {formMessage.text}
            </Button>
          </Card.Actions>
        </Card>
      </ScrollView>
    </View>
  );
}

export default UserRegisterScreen
