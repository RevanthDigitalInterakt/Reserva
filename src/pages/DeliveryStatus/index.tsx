/* eslint-disable @typescript-eslint/quotes */
import React from 'react';
import { View } from 'react-native';
import WebView from 'react-native-webview';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TopBarBackButton } from '../../modules/Menu/components/TopBarBackButton';

export default function DeliveryStatus() {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View style={{ flex: 1 }}>
      <TopBarBackButton
        showShadow
        backButtonPress={() => navigation.goBack()}
        loading={false}
      />
      <WebView
        source={{ uri: `${route.params?.data || ''}` }}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
      />
    </View>
  );
}
