import React, { useState } from 'react';
import { WebView } from 'react-native-webview';
import { Box } from '@danilomsou/reserva-ui';
import { TopBarBackButton } from '../Menu/components/TopBarBackButton';

export const WebviewZendesk: React.FC<{}> = () => {
    const [loading, setLoading] = useState(true);
    const [navState, setNavState] = useState('');
    const scripts = `
      document.querySelector("header").style.display = 'none';
      document.querySelector("ol").style.display = 'none';
      document.getElementsByClassName("footer-inner")[0].style.display = 'none';
    `;

    return (
        <Box flex={1} backgroundColor={'white'}>
            <TopBarBackButton loading={loading} showShadow />
            <WebView
                onLoadStart={() => {
                    setLoading(true);
                }}
                onLoadEnd={() => {
                    setTimeout(() => setLoading(false), 1500);
                }}
                onNavigationStateChange={(navState) => {
                    console.log('navState', navState)
                    setNavState(navState.url);
                }}
                injectedJavaScript={scripts}
                source={{
                    uri: `https://usereserva.zendesk.com/hc/pt-br/requests/new`,
                }}
            />
        </Box>
    );
};
