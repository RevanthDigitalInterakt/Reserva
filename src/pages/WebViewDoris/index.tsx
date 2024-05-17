import React, { useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import WebView, { WebViewMessageEvent } from "react-native-webview";
import { Platform, View } from "react-native";
import deviceInfo from "react-native-device-info";
import { useBagStore } from "../../zustand/useBagStore/useBagStore";
import { TopBarBackButton } from "../../modules/Menu/components/TopBarBackButton";
import { mergeItemsPackage } from "../../utils/mergeItemsPackage";
import testProps from "../../utils/testProps";
import type { OrderformAddMultipleItemInput } from "../../base/graphql/generated";

interface IItemRawMessage {
  identifier: string,
  sellerId: string
}

export default function WebViewDoris() {
  const navigation = useNavigation();
  const { actions, packageItems, orderFormId } = useBagStore(["actions", "packageItems", "orderFormId"]);
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const webviewRef = useRef(null);

  const mergeItems = mergeItemsPackage(packageItems);

  const injectedJavaScript = `
  window.metadata = { appVersion: "${deviceInfo.getVersion()}", platformType: "${
    Platform.OS
  }" }
`;

  const onMessage = async (event: WebViewMessageEvent) => {
    const { data } = event.nativeEvent;

    const { type, rawMessage } = JSON.parse(data);

    switch (type) {
      case "add-to-cart": {
        const orderItems = rawMessage.data.map((itemRawMessage: IItemRawMessage) => ({
          id: itemRawMessage.identifier,
          seller: itemRawMessage.sellerId,
          quantity: 1,
        }));

        await actions.ADD_MULTIPLE_ITEMS({
          orderFormId,
          orderItems,
        });
        return null;
      }

      case "error": {
        navigation.goBack();
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
        {...testProps("web_view_doris")}
        ref={webviewRef}
        cacheEnabled={false}
        cacheMode="LOAD_NO_CACHE"
        clearCache
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
        originWhitelist={["*"]}
        source={{ uri: route?.params?.url }}
        javaScriptCanOpenWindowsAutomatically
        onMessage={onMessage}
        geolocationEnabled
        domStorageEnabled
      />
    </>
  );
}
