import { Platform } from 'react-native';

const testProps = (testID: string) => {
  if (Platform.OS === 'ios') {
    return {
      testID,
      accessible: false,
    };
  }

  return {
    accessible: true,
    accessibilityLabel: testID,
  };
};

export default testProps;
