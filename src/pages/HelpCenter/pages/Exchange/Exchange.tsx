import React from 'react';
import WebView from 'react-native-webview';
import type { StackScreenProps } from '@react-navigation/stack';
import type { RootStackParamList } from '../../../../routes/StackNavigator';

type Props = StackScreenProps<RootStackParamList, 'Exchange'>;

export default function Exchange({ route }: Props) {
  const { url } = route.params;
  return <WebView source={{ uri: url }} />;
}
