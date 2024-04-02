import axios, { AxiosError } from "axios";

const login = async (id: String, password: String) => {
  const response = await axios.post('http://snd.synology.me:8081/api/login', { id, password });
  return response.data;
}

const loginException = (error: AxiosError | Error): string => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      switch (error.response.status) {
        case 500:
          return '아이디와 비밀번호를 확인하여주세요.';
        case 401:
          return '인증되지 않은 계정입니다. 관리자에게 문의하여주세요.';
        default:
          return '네트워크 상태를 확인하여주세요.';
      }
    } else {
      return '네트워크 상태를 확인하여주세요.';
    }
  } else {
    return '네트워크 상태를 확인하여주세요.';
  }
}


export const AuthenticationService = {
  login,
  loginException
}
