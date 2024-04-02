import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import CommonStyles from "../styles/CommonStyles.tsx";
import { Button, Card, Text, TextInput } from "react-native-paper";
import DropDownPicker from 'react-native-dropdown-picker';


const UserRegisterScreen = () => {

  const [companySelectOpen, setCompanySelectOpen] = useState(false);
  const [companySelectValue, setCompanySelectValue] = useState(null);
  const [companySelectItems, setCompanySelectItems] = useState([
    {label: '1', value: '1'},
    {label: '2', value: '2'},
    {label: '3', value: '3'},
  ]);

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');




  return(
    <View style={[CommonStyles.ContainerFlexCentered, CommonStyles.backGroundPrimary50]}>
      <ScrollView
        contentContainerStyle={{alignItems: 'center'}}
      >
        <Card
          mode={"outlined"}
          style={{flex:1, marginTop: 25, marginBottom: 15, backgroundColor: "rgb(244, 249, 250)"}}
        >
          <Card.Title title={"신규사용자 등록"} style={{width: '100%'}} />
          <TextInput
            label="사용자 ID"
            placeholder={"사용자 ID를 입력하여주세요."}
            value={id}
            onChangeText={idString => setId(idString)}
            mode="outlined"
            outlineColor={"rgb(170, 170, 170)"}
            activeOutlineColor={"rgb(85, 114, 83)"}
            style={{marginHorizontal: 10, marginBottom: 1}}
          />
          <Text style={{marginHorizontal: 25, marginBottom: 1}}>{}</Text>

          <TextInput
            label="비밀번호"
            placeholder={"비밀번호를 입력하여주세요."}
            value={password}
            onChangeText={passwordString => setPassword(passwordString)}
            mode="outlined"
            outlineColor={"rgb(170, 170, 170)"}
            activeOutlineColor={"rgb(85, 114, 83)"}
            style={{marginHorizontal: 10, marginBottom: 1}}
          />
          <Text style={{marginHorizontal: 25, marginBottom: 1}}>{}</Text>

          <TextInput
            label="비밀번호 확인"
            placeholder={"비밀번호를 다시한번 입력하여주세요."}
            value={passwordCheck}
            onChangeText={passwordCheck => setPasswordCheck(passwordCheck)}
            mode="outlined"
            outlineColor={"rgb(170, 170, 170)"}
            activeOutlineColor={"rgb(85, 114, 83)"}
            style={{marginHorizontal: 10, marginBottom: 1}}
          />
          <Text style={{marginHorizontal: 25, marginBottom: 1}}>{}</Text>

          <TextInput
            label="이름"
            placeholder={"이름을 입력하여주세요."}
            value={name}
            onChangeText={name => setName(name)}
            mode="outlined"
            outlineColor={"rgb(170, 170, 170)"}
            activeOutlineColor={"rgb(85, 114, 83)"}
            style={{marginHorizontal: 10, marginBottom: 1}}
          />
          <Text style={{marginHorizontal: 25, marginBottom: 1}}>{}</Text>

          <View style={{zIndex: 100}}>
            <DropDownPicker
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
              style={{marginHorizontal: 10, marginBottom: 1, width: '94%'}}
              placeholder={"소속을 선택하여주세요"}
              dropDownContainerStyle={{marginHorizontal: 10, marginBottom: 1, width: '94%'}}
            />
          </View>
          <Text style={{marginHorizontal: 25, marginBottom: 1}}>{}</Text>

          <TextInput
            label="전화번호"
            placeholder={"연락처를 입력하여주세요."}
            value={phone}
            onChangeText={phone => setPhone(phone)}
            mode="outlined"
            outlineColor={"rgb(170, 170, 170)"}
            activeOutlineColor={"rgb(85, 114, 83)"}
            style={{marginHorizontal: 10, marginBottom: 1}}
          />
          <Text style={{marginHorizontal: 25, marginBottom: 1}}>{}</Text>

          <TextInput
            label="이메일"
            placeholder={"이메일을 입력하여주세요."}
            value={email}
            onChangeText={email => setEmail(email)}
            mode="outlined"
            outlineColor={"rgb(170, 170, 170)"}
            activeOutlineColor={"rgb(85, 114, 83)"}
            style={{marginHorizontal: 10, marginBottom: 1}}
          />
          <Text style={{marginHorizontal: 25, marginBottom: 1}}>{}</Text>

          <Card.Actions
            style={{alignItems: 'center'}}
          >
            <Button
              mode="contained"
              buttonColor={"rgb(128, 128, 128)"}
              rippleColor={"rgb(155, 208, 151)"}
              style={{width: "100%", borderRadius: 5}}
            >
              모든 정보를 입력하여주세요.
            </Button>
          </Card.Actions>
        </Card>
      </ScrollView>
    </View>
  );
}

export default UserRegisterScreen
