import React, { useMemo } from 'react';
import WebviewCheckout from './WebviewCheckout';
import Checkout from '../../modules/Checkout/pages/WebviewCheckout';
import { useRemoteConfig } from '../../hooks/useRemoteConfig';

export const WebviewABTest = () => {
  const { getBoolean } = useRemoteConfig();

  const showNewWebviewCheckout = useMemo(() => (
    getBoolean('show_new_webview_checkout_v2')
  ), [getBoolean]);

  return (
    showNewWebviewCheckout ? <WebviewCheckout /> : <Checkout />
  );
};
