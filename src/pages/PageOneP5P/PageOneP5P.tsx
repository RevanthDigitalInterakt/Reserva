import type { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback } from 'react';
import WebView from 'react-native-webview';
import type { RootStackParamList } from '../../routes/StackNavigator';
import { TopBarBackButton } from '../../modules/Menu/components/TopBarBackButton';
import { useBagStore } from '../../zustand/useBagStore/useBagStore';

type IPageOneP5P = StackScreenProps<RootStackParamList, 'PageOneP5P'>;

function PageOneP5P({ navigation }: IPageOneP5P) {
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
        source={{ uri: 'https://usereserva.com/1p5p?webview=true&workspace=ct25411' }}
      />
    </>
  );
}

export default PageOneP5P;
