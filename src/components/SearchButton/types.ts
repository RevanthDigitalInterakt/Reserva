import type { ViewProps } from 'react-native';

export type SearchButtonProps = {
  onPress: () => void;
  placeholder?: string;
  isFixed?: boolean;
  style?: ViewProps['style'];
};
