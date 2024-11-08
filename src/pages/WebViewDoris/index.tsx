import React, { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import { Platform, View } from 'react-native';
import deviceInfo from 'react-native-device-info';
import { useBagStore } from '../../zustand/useBagStore/useBagStore';
import { TopBarBackButton } from '../../modules/Menu/components/TopBarBackButton';
import testProps from '../../utils/testProps';
import useDorisStore from '../../zustand/useDorisStore';

interface IItemRawMessage {
  identifier: string,
  sellerId: string
}

export default function WebViewDoris() {
  const navigation = useNavigation();
  const { actions, orderFormId } = useBagStore(['actions', 'orderFormId']);
  const { dorisUrl, setShowAnimationBagDoris } = useDorisStore(['dorisUrl', 'setShowAnimationBagDoris']);
  const [loading, setLoading] = useState(false);
  const webviewRef = useRef(null);

  const injectedJavaScript = `
  window.metadata = { appVersion: "${deviceInfo.getVersion()}", platformType: "${
  Platform.OS
}" }
`;

  const onMessage = async (event: WebViewMessageEvent) => {
    const { data } = event.nativeEvent;

    const { type, rawMessage } = JSON.parse(data);

    switch (type) {
      case 'add-to-cart': {
        const orderItems = rawMessage.data.map((itemRawMessage: IItemRawMessage) => ({
          id: itemRawMessage.identifier,
          seller: itemRawMessage.sellerId,
          quantity: 1,
        }));

        navigation.goBack();

        await actions.ADD_MULTIPLE_ITEMS({
          orderFormId,
          orderItems,
        });

        setShowAnimationBagDoris(true);

        return null;
      }

      case 'error': {
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
        {...testProps('web_view_doris')}
        ref={webviewRef}
        cacheEnabled
        startInLoadingState
        onLoadStart={(event) => {
          const { nativeEvent } = event;
          setLoading(nativeEvent.loading);
        }}
        onLoadEnd={(event) => {
          const { nativeEvent } = event;
          setLoading(nativeEvent.loading);
        }}
        injectedJavaScriptBeforeContentLoaded={injectedJavaScript}
        originWhitelist={['*']}
        source={{ uri: dorisUrl }}
        javaScriptCanOpenWindowsAutomatically
        onMessage={onMessage}
        useWebKit
        contentInsetAdjustmentBehavior="always"
        geolocationEnabled
        domStorageEnabled
        allowsInlineMediaPlayback
      />
    </>
  );
}
