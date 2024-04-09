import React, { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import CommonStyles from "../styles/CommonStyles.tsx";
import { useLoading } from "../context/LoadingContext.tsx";
import { NfcReader, NfcUtil } from "../utils/NfcUtil.ts";
import { Button } from "react-native-paper";
import NfcReadingComponent from "./NfcReadingComponent.tsx";
import { useSnackbar } from "../context/SnackbarContext.tsx";

interface NfcComponentProps {
  activeTab: boolean;
}
const NfcComponent: React.FC<NfcComponentProps> = ({ activeTab }) => {
  const { startLoading, stopLoading } = useLoading();
  const { showSnackbar } = useSnackbar();
  const [isReadingNfc, setReadingNfc] = useState<boolean>(false);
  const [currentNfcData, setNfcData] = useState<NfcStructure | null>(null);
  const nfcReaderRef = useRef<NfcReader | null>(null);

  // init
  useEffect(() => {
    nfcReaderRef.current = NfcReader.getInstance();
  }, []);

  // tab Event
  useEffect(() => {
    if (!activeTab && isReadingNfc) {
      setReadingNfc(false);
    }
  }, [activeTab, isReadingNfc]);

  // Closing NFC Reading Mode
  useEffect(() => {
    if (!isReadingNfc) {
      nfcReaderRef.current?.cleanReadEvent();
    }
  }, [isReadingNfc]);

  // Current Nfc Data
  useEffect(() => {
    //console.log(currentNfcData);
  }, [currentNfcData]);

  const readNfc = async () => {
    if (nfcReaderRef.current) {
      setReadingNfc(true);
      const result = await nfcReaderRef.current.startReadEvent();
      if (NfcUtil.isNfcResultError(result)) {
        showSnackbar(`${result.message}`);
      } else {
        setNfcData({... result});
      }
      setReadingNfc(false);
    }
  };




  return (
    <View style={[CommonStyles.ContainerFlex, CommonStyles.backGroundPrimary50]}>
      {!isReadingNfc && !currentNfcData &&
      <View style={CommonStyles.ContainerFlexCentered}>
        <Button onPress={readNfc}>NFC 읽기</Button>
      </View>
      }
      {isReadingNfc && <NfcReadingComponent setReadingNfc={setReadingNfc} />}
      {currentNfcData && !isReadingNfc &&
        <View style={CommonStyles.ContainerFlexCentered}>
          <Text>NFC UID : {currentNfcData.id}</Text>
          <Text>쓰기 가능여부 : {currentNfcData.isWritable}</Text>
          <Text>최대 용량 : {currentNfcData.maxSize}</Text>
          <Text>타입 : {currentNfcData.type}</Text>
          <Text>기술 타입 : {currentNfcData.techTypes}</Text>
          <Button onPress={readNfc}>새로운 NFC 읽기</Button>
        </View>
      }
    </View>
  );
}


export default NfcComponent
