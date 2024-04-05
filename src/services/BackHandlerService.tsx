// @ts-nocheck
import React, { useEffect } from 'react';
import { Alert, BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigationState } from '@react-navigation/native';

function useCustomBackAction(handler) {
  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', handler);
      return () => BackHandler.removeEventListener('hardwareBackPress', handler);
    }, [handler])
  );
}

function registerExitBackHandler() {
  const index = useNavigationState(state => state.index);

  useCustomBackAction(() => {
    if (index === 0) { // 네비게이터 스택의 최상단인 경우
      Alert.alert('종료', '앱을 종료하시겠습니까?', [
        {
          text: '취소',
          onPress: () => null,
          style: 'cancel'
        },
        { text: '확인', onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    }

    // 스택의 최상단이 아닌 경우 기본 동작(이전 스크린으로 이동) 수행
    return false;
  });
}

export const BackHandlerService = {
  registerExitBackHandler
}
