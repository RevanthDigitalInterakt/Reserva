import { Platform } from 'react-native';
import { platformType } from './platformType';

const prefix = 'com.usereserva:id/' as const;

const testProps = (value: string) => {
  const testID = (value || '').startsWith(prefix) ? value : `${prefix}${value}`;

  if (Platform.OS === platformType.IOS) {
    return {
      testID,
      accessible: false,
    };
  }

  return {
    testID,
    accessible: true,
    accessibilityLabel: testID,
  };
};

export default testProps;
