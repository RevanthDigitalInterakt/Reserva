export interface NewButtonStyleProps {
  disabled?: boolean;
  textColor?: string;
}

export interface NewButtonProps {
  onPress: () => void;
  text: string;
  textColor?: string;
  disabled?: boolean;
  testID?: string;
}
