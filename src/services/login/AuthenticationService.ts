import axios, { AxiosError } from "axios";
import JsonWebTokenStorageService from "./JsonWebTokenStorageService.ts";
import { JsonWebToken } from "../../types/interface/JsonWebToken.ts";

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
        case 403:
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

const tokenValidation = async () => {
  try {
    const accessToken = await JsonWebTokenStorageService.getAccessToken();
    const response = await axios.post('http://snd.synology.me:8081/api/validate', {}, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    console.log(response.data.status);
    return response.data.status === 'success';
  } catch (error: any) {
    console.error(error);
    try {
      const refreshRequest = await refreshTokenRequest();
      console.log(refreshRequest?.data);
      const tokens: JsonWebToken = {
        accessToken: refreshRequest?.data.newAccessToken,
        refreshToken: refreshRequest?.data.newRefreshToken
      }
      await JsonWebTokenStorageService.saveTokens(tokens);
    } catch (error: any) {
      console.error(error);
      return false;
    }
  }
}

const refreshTokenRequest = async () => {
  try {
    const refreshToken = await JsonWebTokenStorageService.getRefreshToken();
    return await axios.get('http://snd.synology.me:8081/api/jwt/refresh', {
      headers: {
        'X-Refresh-Token': `Bearer ${refreshToken}`
      }
    });
  } catch (error: any) {
    console.error(error);
    return null
  }
}


export const AuthenticationService = {
  login,
  loginException,
  tokenValidation
}
