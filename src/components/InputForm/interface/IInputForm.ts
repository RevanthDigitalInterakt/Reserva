import type { TextInput } from 'react-native';

type TKeyboardType = 'default' | 'number-pad' | 'decimal-pad' | 'numeric' | 'email-address' | 'phone-pad' | 'url';

type TSetFieldValue = (field: string, value: any, shouldValidate?: boolean | undefined) => void;

export type TCheckPostalCodeFn = (
  value: string,
  setFieldValue: TSetFieldValue,
) => Promise<void>;

type TTestProps = {
  testID: string;
  accessibilityLabel: string;
};

export interface IInputForm {
  placeholder: string;
  inputValue?: string;
  onTextChange(value: string): void;
  inputRef: React.RefObject<TextInput>;
  nextInputRef?: React.RefObject<TextInput>;
  inputName: string;
  fieldTouched: (field: string) => void;
  error?: string;
  isEditable: boolean;
  textInputType: TKeyboardType;
  checkPostalCode?: TCheckPostalCodeFn;
  setFieldValue?: TSetFieldValue;
  inputID: TTestProps;
  touched?: boolean;
  showMessageError?: boolean;
  maxLength?: number;
}
