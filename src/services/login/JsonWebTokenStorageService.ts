import * as Keychain from 'react-native-keychain';
import { JsonWebToken } from "../../types/interface/JsonWebToken.ts";

class JsonWebTokenStorageService {
  private static serviceName = 'com.yourapp';

  public static async saveTokens(tokens: JsonWebToken): Promise<void> {
    // Access Token 저장
    await Keychain.setGenericPassword('accessToken', tokens.accessToken, {
      service: `${this.serviceName}.accessToken`,
      accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
    });

    // Refresh Token 저장
    await Keychain.setGenericPassword('refreshToken', tokens.refreshToken, {
      service: `${this.serviceName}.refreshToken`,
      accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
    });
  }

  public static async getAccessToken(): Promise<string | null> {
    try {
      const credentials = await Keychain.getGenericPassword({
        service: `${this.serviceName}.accessToken`,
      });
      return credentials ? credentials.password : null;
    } catch (error) {
      console.error('Error retrieving access token from keychain:', error);
      return null;
    }
  }

  public static async getRefreshToken(): Promise<string | null> {
    try {
      const credentials = await Keychain.getGenericPassword({
        service: `${this.serviceName}.refreshToken`,
      });
      return credentials ? credentials.password : null;
    } catch (error) {
      console.error('Error retrieving refresh token from keychain:', error);
      return null;
    }
  }

  public static async clearTokens(): Promise<void> {
    // Access Token 삭제
    await Keychain.resetGenericPassword({ service: `${this.serviceName}.accessToken` });
    // Refresh Token 삭제
    await Keychain.resetGenericPassword({ service: `${this.serviceName}.refreshToken` });
  }
}

export default JsonWebTokenStorageService;
