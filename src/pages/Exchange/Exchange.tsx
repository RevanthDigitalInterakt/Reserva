import React from 'react';
import { View } from 'react-native';
import WebView from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { TopBarBackButton } from '../../modules/Menu/components/TopBarBackButton';

export default function Exchange() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <TopBarBackButton
        showShadow
        backButtonPress={() => navigation.goBack()}
        loading={false}
      />
      <WebView
        source={{ uri: 'https://front.geniusreturns.com.br/pages/default.aspx?alias=usereserva' }}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
      />
    </View>
  );
}
