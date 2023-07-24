import type { TextInput } from 'react-native';

type KeyboardType = 'default' | 'number-pad' | 'decimal-pad' | 'numeric' | 'email-address' | 'phone-pad' | 'url';

export interface IInputForm {
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
}
