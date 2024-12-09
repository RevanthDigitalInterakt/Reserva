import React, { useEffect, useRef, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import { Platform, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Config from 'react-native-config';
import { useBagStore } from '../../zustand/useBagStore/useBagStore';
import { trackPageViewStore } from '../../zustand/useTrackPageViewStore/useTrackPageViewStore';
import testProps from '../../utils/testProps';
import { TopBarMenu } from '../../modules/Menu/components/TopBarMenu';
import { useAuthStore } from '../../zustand/useAuth/useAuthStore';
import { handleObjectToQueryParams } from '../../utils/handleObjectToQueryParams';

interface IOnLoad {
  nativeEvent: any;
}

export default function WebViewFacaVoce() {
  const route = useRoute();
  const { params } = route;

  const navigation = useNavigation();
  const { orderFormId } = useBagStore(['orderFormId']);
  const { profile } = useAuthStore(['profile']);
  const [loading, setLoading] = useState(false);
  const webviewRef = useRef(null);
  const [key, setKey] = useState(0);

  const injectedJavaScript = `window.metadata = { appVersion: "${DeviceInfo.getVersion()}", platformType: "${Platform.OS}" }`;
  const clientId = profile?.id || '';
  const { sessionId } = trackPageViewStore.getState();

  const baseUrl = Config.R2U_URL;
  let sourceUri = `${baseUrl}?context=app&client_id=${clientId}&session_id==${sessionId}&orderform_id=${orderFormId}`;

  if (params) {
    const validKeys: string[] = ['category', 'custom', 'type'];

    const paramsToFind = handleObjectToQueryParams(params, validKeys);

    if (paramsToFind.length) sourceUri = sourceUri.concat('&').concat(paramsToFind);
  }

  const onMessage = async (event: WebViewMessageEvent) => {
    const { data } = event.nativeEvent;
    const { event: type } = JSON.parse(data);

    switch (type) {
      case 'facavcgotocart': {
        navigation.navigate('BagScreen');
        setKey((prevKey) => prevKey + 1);
        return null;
      }

      default:
        return null;
    }
  };

  return (
    <>
      <View>
        <TopBarMenu loading={loading} />
      </View>
      <WebView
        key={key}
        {...testProps('web_view_facavc')}
        ref={webviewRef}
        cacheEnabled={false}
        cacheMode="LOAD_NO_CACHE"
        clearCache
        startInLoadingState
        saveFormDataDisabled
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
