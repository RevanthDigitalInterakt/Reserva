import React from 'react';
import Toast from 'react-native-toast-message';

export const ShowToast = (type: string, text1?: string, text2?: string) => {
  Toast.show({
    type,
    text1,
    text2,
  });
};

const ToastProvider = () => (
  <Toast />
);

export default ToastProvider;
