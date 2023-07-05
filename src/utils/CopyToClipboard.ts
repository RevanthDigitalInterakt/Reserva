import Clipboard from '@react-native-community/clipboard';

export const handleCopyTextToClipboard = (text: string): void => {
  Clipboard.setString(text);
};

export const getCopiedValue = async () => {
  const content = await Clipboard.getString();
  return content;
};
