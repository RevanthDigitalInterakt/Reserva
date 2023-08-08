import Clipboard from '@react-native-clipboard/clipboard';

export const handleCopyTextToClipboard = (text: string): void => {
  Clipboard.setString(text);
};

export const getCopiedValue = async () => {
  const content = await Clipboard.getString();
  return content;
};
