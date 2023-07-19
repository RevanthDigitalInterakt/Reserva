import type { TextInput } from 'react-native';

export interface IInputForm {
  placeholder: string;
  inputValue?: string;
  onTextChange(value: string): void;
  inputRef: React.RefObject<TextInput>;
  nextInputRef: React.RefObject<TextInput>;
}
