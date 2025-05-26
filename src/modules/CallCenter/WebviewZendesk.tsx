import React, { useRef, useState } from 'react';
import { WebView } from 'react-native-webview';
import LottieView from 'lottie-react-native';
import { TopBarBackButton } from '../Menu/components/TopBarBackButton';
import { Box } from '../../components/Box/Box';
import { loadingSpinner } from '../../../assets/animations';

export const WebviewZendesk: React.FC<{}> = () => {
  const [loading, setLoading] = useState(true);
  const [, setNavState] = useState('');
  const webref = useRef(false);

  const scripts = `
      document.querySelector("header").style.display = 'none';
      document.querySelector("ol").style.display = 'none';
      document.getElementsByClassName("footer-inner")[0].style.display = 'none';
      true;
    `;

  return (
    <Box flex={1} backgroundColor="white">
      {loading && (
        <Box
          zIndex={5}
          height="100%"
          width="100%"
          backgroundColor="white"
          position="absolute"
          justifyContent="center"
          alignItems="center"
        >
          <LottieView
            source={loadingSpinner}
            style={{
              width: 60,
            }}
            autoPlay
            loop
          />
        </Box>
      )}
      <TopBarBackButton loading={loading} showShadow />
      <WebView
        ref={webref}
        onLoadStart={() => {
          setLoading(true);
        }}
        onLoadEnd={() => {
          setTimeout(() => setLoading(false), 1500);
        }}
        onNavigationStateChange={(navState) => {
          if (
            navState.url
            !== 'https://usereserva.zendesk.com/hc/pt-br/requests/new'
          ) {
            setLoading(false);
          }
          setNavState(navState.url);
        }}
        onLoadProgress={(e) => {
          webref.current?.injectJavaScript(scripts);
        }}
        source={{
          uri: 'https://usereserva.zendesk.com/hc/pt-br/requests/new',
        }}
      />
    </Box>
  );
};
