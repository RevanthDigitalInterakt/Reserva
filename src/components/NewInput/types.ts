import type { TextInputProps } from 'react-native';

export enum NewInputType {
  TEXT = 'text',
  CALL_TO_ACTION = 'call_to_action',
}

export interface NewInputProps extends TextInputProps {
  type: NewInputType;
  placeholder?: string;
  onPress?: () => void;
  onChangeText?: (text: string) => void;
  value?: string | undefined;
}
