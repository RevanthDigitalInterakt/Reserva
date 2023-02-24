import { theme } from '@usereservaapp/reserva-ui';
import React from 'react';
import Toast, { BaseToast, BaseToastProps, ToastShowParams } from 'react-native-toast-message';
import configDeviceSizes from '../configDeviceSizes';

const TOAST_WIDTH = configDeviceSizes.DEVICE_WIDTH * 0.85;

export interface ShowToastParams extends ToastShowParams {
  type: keyof typeof toastConfig;
  text1?: string;
  text2?: string;
}

export const showToast:(params:ShowToastParams) => void = ({
  type, text1, text2, ...params
}) => {
  Toast.show({
    type,
    text1,
    text2,
    ...params,
  });
};

const toastConfig = {
  success: (props:BaseToastProps) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: theme.colors.verdeSucesso, width: TOAST_WIDTH }}
      text1Props={{ numberOfLines: 2 }}

    />
  ),
  error: (props:BaseToastProps) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: theme.colors.vermelhoAlerta, width: TOAST_WIDTH }}
      text1Props={{ numberOfLines: 2 }}
    />
  ),
  warning: (props:BaseToastProps) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: theme.colors.amareloAtencao, width: TOAST_WIDTH }}
      text1Props={{ numberOfLines: 2 }}
    />
  ),
};

const ToastProvider: React.FC = () => (
  <Toast config={toastConfig} />
);

export default ToastProvider;
