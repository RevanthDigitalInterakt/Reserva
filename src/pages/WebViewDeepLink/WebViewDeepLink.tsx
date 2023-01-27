import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { Platform, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import type { TWebViewDeepLikProps } from './interfaces/WebViewDeepLink';
import { editProfileStyles as Styles } from '../EditProfile/styles/editProfile.styles';
import { TopBarBackButton } from '../../modules/Menu/components/TopBarBackButton';
import { platformType } from '../../utils/platformType';

function WebViewDeepLink({ route: { params: { uri } } }: TWebViewDeepLikProps):JSX.Element {
  const [topBarLoading, setTopBarLoading] = useState<boolean>(false);
  const [webviewCanGoBack, setWebViewCanGoBack] = useState<boolean>(false);
  const navigation = useNavigation();
  const loadTopBarTimeOut = useRef<any>(null);
  const webviewRef = useRef<WebView | null>(null);

  const handleTopBarGoBackButton = useCallback(() => {
    if (!webviewCanGoBack) {
      navigation.reset({
        routes: [{ name: 'HomeTabs' }],
      });
      return;
    }

    if (webviewRef.current) {
      webviewRef.current.goBack();
    }
  }, [webviewCanGoBack, webviewRef]);

  const handleLoadStartWebView = useCallback(() => {
    setTopBarLoading(true);
  }, []);

  const handleLoadEndWebView = useCallback(() => {
    loadTopBarTimeOut.current = setTimeout(() => setTopBarLoading(false), 1500);
  }, []);

  const handleNavigationStateChange = useCallback((canGoBack: boolean) => {
    if (canGoBack !== webviewCanGoBack) {
      setWebViewCanGoBack(canGoBack);
    }
  }, [webviewCanGoBack]);

  useEffect(() => () => {
    clearTimeout(loadTopBarTimeOut.current);
  }, []);

  return (
    <SafeAreaView style={Styles.safeArea}>
      <TopBarBackButton
        loading={topBarLoading}
        backButtonPress={handleTopBarGoBackButton}
      />

      <WebView
        ref={webviewRef}
        onLoadStart={handleLoadStartWebView}
        onLoadEnd={handleLoadEndWebView}
        source={{ uri: `https://${uri}` }}
        originWhitelist={['*']}
        {...Platform.OS === platformType.IOS ? {
          onNavigationStateChange: (ev) => handleNavigationStateChange(ev.canGoBack),
        } : {
          onLoadProgress: (ev) => handleNavigationStateChange(ev.nativeEvent.canGoBack),
        }}
      />

    </SafeAreaView>
  );
}

export default WebViewDeepLink;
