export enum NewInputType {
  TEXT = 'text',
  CALL_TO_ACTION = 'call_to_action',
}

export interface NewInputProps {
  type: NewInputType;
  placeholder?: string;
  onPress?: () => void;
  onChangeText?: (text: string) => void;
  value?: string | undefined;
}
