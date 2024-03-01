import type { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useEffect } from 'react';
import WebView from 'react-native-webview';
import type { RootStackParamList } from '../../routes/StackNavigator';
import { TopBarBackButton } from '../../modules/Menu/components/TopBarBackButton';
import { useBagStore } from '../../zustand/useBagStore/useBagStore';
import EventProvider from '../../utils/EventProvider';

type IPageOneP5P = StackScreenProps<RootStackParamList, 'PageOneP5P'>;

function PageOneP5P({ route, navigation }: IPageOneP5P) {
  const { topBarLoading } = useBagStore(['topBarLoading']);

  useEffect(() => {
    const { comeFrom } = route.params || {};
    EventProvider.logEvent(comeFrom === 'Menu' ? 'click_1p5p_menu' : 'click_1p5p_home', {});
  }, []);

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
        source={{ uri: 'https://www.usereserva.com/1p5p?webview=true' }}
      />
    </>
  );
}

export default PageOneP5P;
