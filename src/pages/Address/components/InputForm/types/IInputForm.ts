import type { TextInput } from 'react-native';

type KeyboardType = 'default' | 'number-pad' | 'decimal-pad' | 'numeric' | 'email-address' | 'phone-pad' | 'url';

type SetFieldValue = (field: string, value: any, shouldValidate?: boolean | undefined) => void;

export type CheckPostalCodeFn = (
  value: string,
  setFieldValue: SetFieldValue,
) => Promise<void>;

export type IInputForm = {
  placeholder: string;
  inputValue?: string;
  onTextChange(value: string): void;
  inputRef: React.RefObject<TextInput>;
  nextInputRef: React.RefObject<TextInput>;
  inputName: string;
  fieldTouched: (field: string) => void;
  error?: string;
  isEditable: boolean;
  textInputType: KeyboardType;
  checkPostalCode?: CheckPostalCodeFn;
  setFieldValue?: SetFieldValue;
  inputID: string;
  touched?: boolean;
};
