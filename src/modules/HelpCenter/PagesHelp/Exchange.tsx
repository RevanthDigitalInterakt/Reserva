import React from 'react';

import WebView from 'react-native-webview';


export function Exchange() {
  const url = 'https://front.geniusreturns.com.br/pages/default.aspx?alias=usereserva'
  return <WebView source={{ uri: url }} />;
}
