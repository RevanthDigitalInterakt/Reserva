import React, { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import { Platform, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { useBagStore } from '../../zustand/useBagStore/useBagStore';
import { TopBarBackButton } from '../../modules/Menu/components/TopBarBackButton';
import { trackPageViewStore } from '../../zustand/useTrackPageViewStore/useTrackPageViewStore';
import testProps from '../../utils/testProps';
import { useAuthStore } from '../../zustand/useAuth/useAuthStore';

interface IOnLoad {
  nativeEvent: any;
}

export default function WebViewFacaVoce() {
  const navigation = useNavigation();
  const { orderFormId } = useBagStore(['orderFormId']);
  const { profile } = useAuthStore(['profile']);
  const [loading, setLoading] = useState(false);
  const webviewRef = useRef(null);

  const injectedJavaScript = `window.metadata = { appVersion: "${DeviceInfo.getVersion()}", platformType: "${Platform.OS}" }`;

  const clientId = profile?.id || '';
  const { sessionId } = trackPageViewStore.getState();

  const baseUrl = 'https://storage.googleapis.com/reserva-faca-vc-front-dev/deploy/index.html?context=app';
  const sourceUri = `${baseUrl}&client_id=${clientId}&session_id=${sessionId}&orderform_id=${orderFormId}`;

  const onMessage = async (event: WebViewMessageEvent) => {
    const { data } = event.nativeEvent;
    const { event: type } = JSON.parse(data);

    switch (type) {
      case 'facavccarrinho': {
        navigation.navigate('BagScreen');
        return null;
      }

      default:
        return null;
    }
  };

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
        {...testProps('web_view_facavc')}
        ref={webviewRef}
        cacheEnabled={false}
        cacheMode="LOAD_NO_CACHE"
        clearCache
        startInLoadingState
        onLoadStart={(event: IOnLoad) => {
          const { nativeEvent } = event;
          setLoading(nativeEvent.loading);
        }}
        onLoadEnd={(event: IOnLoad) => {
          const { nativeEvent } = event;
          setLoading(nativeEvent.loading);
        }}
        injectedJavaScriptBeforeContentLoaded={injectedJavaScript}
        originWhitelist={['*']}
        source={{ uri: sourceUri }}
        javaScriptCanOpenWindowsAutomatically
        onMessage={onMessage}
        geolocationEnabled
        domStorageEnabled
      />
    </>
  );
}
