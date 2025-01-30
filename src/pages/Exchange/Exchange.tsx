/* eslint-disable @typescript-eslint/quotes */
import React from 'react';
import { View } from 'react-native';
import WebView from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { TopBarBackButton } from '../../modules/Menu/components/TopBarBackButton';
import { useAuthStore } from '../../zustand/useAuth/useAuthStore';

export default function Exchange() {
  const { profile } = useAuthStore(['profile']);
  const navigation = useNavigation();

  const injectToHtml = () => {
    const data = `document.getElementById('content_txtPedido_e_email_obrigatorio__email').value = '${profile?.email}';`;
    return data;
  };

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
        injectedJavaScript={injectToHtml()}
      />
    </View>
  );
}
