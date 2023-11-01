import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { platformType } from './platformType';

function WithAvoidingView({ children }: { children: React.ReactNode }) {
  if (Platform.OS === platformType.IOS) {
    return (
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        {children}
      </KeyboardAvoidingView>
    );
  }

  return <>{children}</>;
}

export default WithAvoidingView;
