import axios from "axios";

async function getAvailableCompanyListRequest() {
  const response = await axios.get('http://snd.synology.me:8081/api/user/register/get/companyName/active');
  return response.data;
}


function processCompanyNameListForSelect(data: CompanyNameResponse){
  const companyNameList =  data.data;
  const companyNameListArray: { label: string; value: string }[] =  companyNameList.map(item => ({
    label: item.companyName,
    value: item.companyName
  }));
  companyNameListArray.unshift({label: '소속을 선택하여주세요', value: 'default'});
  return companyNameListArray;
}


async function checkDuplicatedIdRequest(id: string): Promise<Boolean> {
  const response = await axios.post('http://snd.synology.me:8081/api/user/register/checkId', {id : id});
  console.log("checkDuplicatedIdRequest", response.data);
  return response.data.data === false;
}

async function registerUserRequest(formData: any): Promise<Boolean>{
  const response = await axios.post('http://snd.synology.me:8081/api/user/register/register', formData);
  console.log("registerUserRequest", response.data);
  return response.data.data;
}


const registrationRegex = {
  // 아이디: 영소문자로 시작하고 영소문자 또는 숫자로 이루어진 3~19자의 문자열
  id : /^[a-z][a-z0-9]{3,19}$/,
  // 비밀번호: 최소 10자리 이상의 영어 대문자, 소문자, 숫자, 특수문자 중 2종류 조합
  password : /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{10,}|(?=.*[A-Za-z])(?=.*[^A-Za-z\d])[A-Za-z\W]{10,}|(?=.*\d)(?=.*[^A-Za-z\d])\d[\W\d]{9,}|(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\W]{10,}$/,
  // 이름: 최소 1글자 이상의 한글문자
  name :  /[\uAC00-\uD7A3]+/,
  // 전화번호: 02로 시작시 8글자 이상, 그 이외의 경우 9글자 이상의 숫자
  phone : /^(02\d{6,}|0\d{8,})$/,
  // 이메일: example@example.com 과 같은 이메일 형식
  email : /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
}


function validateId(id: string) {
  return registrationRegex.id.test(id);
}

function validatePassword(password: string) {
  return registrationRegex.password.test(password);
}

function validatePasswordCheck(password: string, passwordCheck: string) {
  let passwordCheckValidity = registrationRegex.password.test(passwordCheck);
  let passwordEquality = password === passwordCheck;
  return passwordCheckValidity && passwordEquality;
}

function validateNameCheck(name: string) {
  return registrationRegex.name.test(name);
}

function validatePhoneCheck(phone: string) {
  return registrationRegex.phone.test(phone);
}

function validateEmailCheck(email: string) {
  return registrationRegex.email.test(email);
}


export const UserRegistrationService = {
  validateId,
  validatePassword,
  validatePasswordCheck,
  validateNameCheck,
  validatePhoneCheck,
  validateEmailCheck,
  getAvailableCompanyList: getAvailableCompanyListRequest,
  processCompanyNameListForSelect,
  checkDuplicatedIdRequest,
  registerUserRequest
}
