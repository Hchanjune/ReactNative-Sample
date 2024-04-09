import NfcManager, { NfcEvents, NfcTech } from "react-native-nfc-manager";

enum NfcErrorCode {
  NFC_UNAVAILABLE = 'NFC_UNAVAILABLE',
  NFC_NOT_ALLOWED = 'NFC_NOT_ALLOWED',
  NFC_READ_ERROR = 'NFC_READ_ERROR',
  NFC_READ_CANCELLED = 'NFC_READ_CANCELLED'
}

interface NfcError {
  code: NfcErrorCode;
  message: string;
}

const NfcErrorMessages: Record<NfcErrorCode, NfcError> = {
  [NfcErrorCode.NFC_UNAVAILABLE]: {
    code: NfcErrorCode.NFC_UNAVAILABLE,
    message: 'NFC 기능이 비활성화 되어 있습니다.'
  },
  [NfcErrorCode.NFC_NOT_ALLOWED]: {
    code: NfcErrorCode.NFC_NOT_ALLOWED,
    message: '인가받지 못한 NFC 입니다.'
  },
  [NfcErrorCode.NFC_READ_ERROR]: {
    code: NfcErrorCode.NFC_NOT_ALLOWED,
    message: 'NFC 를 읽는 도중 오류가 발생하였습니다.'
  },
  [NfcErrorCode.NFC_NOT_ALLOWED]: {
    code: NfcErrorCode.NFC_NOT_ALLOWED,
    message: 'NFC 기능이 비활성화 되어 있습니다.'
  },
  [NfcErrorCode.NFC_READ_CANCELLED]: {
    code: NfcErrorCode.NFC_READ_CANCELLED,
    message: 'NFC 인식이 취소 되었습니다.'
  },
}

export class NfcReader {

  static instance: NfcReader | null = null;

  public static getInstance() {
    if (!NfcReader.instance) {
      NfcReader.instance = new NfcReader();
    }
    return NfcReader.instance;
  }

  readingInProgress: boolean = false;
  cancelRequested: boolean = false;

  private constructor() {
    if (NfcReader.instance) {
      console.log('객체 생성됨');
      return NfcReader.instance;
    }
    NfcReader.instance = this;
    this.readingInProgress = false;
    this.cancelRequested = false;
  }

  // NFC 태그 읽기 시작
  async startReadEvent(): Promise<NfcStructure | NfcError> {
    if (!(await isNfcSupported() && await isNfcEnabled())) {
      //console.warn('NFC is not supported or enabled on this device.');
      return  NfcErrorMessages[NfcErrorCode.NFC_UNAVAILABLE];
    }

    this.readingInProgress = true;
    this.cancelRequested = false;

    try {
      await NfcManager.requestTechnology(NfcTech.Ndef, {
        alertMessage: 'Ready to scan NFC tags',
      });
      const tagResponse: any = await NfcManager.getTag();
        return {
          id: tagResponse.id,
          isWritable: tagResponse.isWritable,
          canMakeReadOnly: tagResponse.canMakeReadOnly,
          maxSize: tagResponse.maxSize,
          ndefMessage: tagResponse.ndefMessage,
          type: tagResponse.type,
          techTypes: tagResponse.techTypes
        };
    } catch (error) {
      if (this.cancelRequested) {
        return NfcErrorMessages[NfcErrorCode.NFC_READ_CANCELLED];
      } else {
        return NfcErrorMessages[NfcErrorCode.NFC_READ_ERROR];
      }
    } finally {
      this.cleanReadEvent();
    }
  }

  // 리소스 해제 및 작업 취소
  cleanReadEvent() {
    //console.log('Cleaning up NFC read mode and cancelling pending operations.');
    this.readingInProgress = false;
    this.cancelRequested = true;
    NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    NfcManager.setEventListener(NfcEvents.SessionClosed, null);
    NfcManager.cancelTechnologyRequest().catch(() => 0);
    NfcManager.unregisterTagEvent().catch(() => 0);
  }
}


// NFC 지원 여부 확인
async function isNfcSupported(): Promise<boolean> {
  try {
    await NfcManager.start();
    return await NfcManager.isSupported();
  } catch (error: any) {
    console.error("Error,", error);
    return false;
  }
}

// NFC 활성화 여부 확인
async function isNfcEnabled(): Promise<boolean> {
  try {
    return await NfcManager.isEnabled();
  } catch (error: any) {
    console.error("Error,", error);
    return false;
  }
}

// NFC Error Handle
function isNfcResultError(result: NfcStructure | NfcError): result is NfcError {
  return (result as NfcError).code !== undefined;
}

export const NfcUtil = {
  isNfcSupported,
  isNfcEnabled,
  isNfcResultError
};

