import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';

export interface UnderlineInputProps {
  testID: string;
  value?: string;
  width?: number;
  iconSize?: number;
  errorMsg?: string;
  showError?: boolean;
  placeholder?: string;
  isSecureText?: boolean;
  isModal?: boolean;
  onChangeText: (value: string) => void;
  keyboardType?: KeyboardTypeOptions | undefined;
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
}
