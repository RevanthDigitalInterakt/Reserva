import type { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback } from 'react';
import WebView from 'react-native-webview';
import type { RootStackParamList } from '../../routes/StackNavigator';
import { TopBarBackButton } from '../../modules/Menu/components/TopBarBackButton';
import { useBagStore } from '../../zustand/useBagStore/useBagStore';

type IOneP5P = StackScreenProps<RootStackParamList, 'OneP5P'>;

function OneP5P({ navigation }: IOneP5P) {
  const { topBarLoading } = useBagStore(['topBarLoading']);
  const handleBackTopBarButtonPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);
  return (
    <>
      <TopBarBackButton
        showShadow
        backButtonPress={handleBackTopBarButtonPress}
        loading={topBarLoading}
      />
      <WebView
        source={{ uri: 'https://www.google.com.br/' }}
      />
    </>
  );
}

export default OneP5P;
