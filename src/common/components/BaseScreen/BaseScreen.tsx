import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import styles from './styles';

interface BaseScreenProps {
  testID?: string;
}

const BaseScreen: React.FC<BaseScreenProps> = ({ children, testID }) => (
  <KeyboardAvoidingView
    testID={testID}
    style={styles.wrapper}
    behavior='padding'
    enabled
    keyboardVerticalOffset={120}
  >
    {children}
  </KeyboardAvoidingView>
);

export default BaseScreen;
