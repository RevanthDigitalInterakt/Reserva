import React, { useCallback, useRef, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import WebView, { WebViewMessageEvent, WebViewNavigation } from 'react-native-webview';
import { Platform, View } from 'react-native';
import deviceInfo from 'react-native-device-info';

import { TopBarBackButton } from '../../modules/Menu/components/TopBarBackButton';

export default function WebViewDoris() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [navState, setNavState] = useState('');
  const route = useRoute();
  const webviewRef = useRef(null);

  const injectedJavaScript = `
  window.metadata = { appVersion: "${deviceInfo.getVersion()}", platformType: "${Platform.OS}" }
`;

  const onMessage = async (event: WebViewMessageEvent) => {
    let newData = null;
    const { data } = event.nativeEvent;

    newData = JSON.parse(data);

    console.log('NEW DATA', newData);
  };

  const onNavigationStateChangeCapture = (event: WebViewNavigation) => {
    setNavState(event.url);
  };

  const uri = 'https://rec32255--lojausereserva.myvtex.com/doris-webview';

  return (
    <>
      <View>
        <TopBarBackButton
          showShadow
          backButtonPress={() => navigation.goBack()}
          loading={loading}
        />
      </View>
      <WebView
        ref={webviewRef}
        startInLoadingState
        injectedJavaScriptBeforeContentLoaded={injectedJavaScript}
        originWhitelist={['*']}
        testID="com.usereserva:id/web_view_checkout"
        source={{ uri }}
        javaScriptCanOpenWindowsAutomatically
        onMessage={onMessage}
        geolocationEnabled
        domStorageEnabled
        onNavigationStateChange={onNavigationStateChangeCapture}
      />
    </>
  );
}
