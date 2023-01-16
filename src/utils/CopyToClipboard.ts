import Clipboard from '@react-native-community/clipboard';

const handleCopyTextToClipboard = (text: string): void => {
  Clipboard.setString(text);
};

export default handleCopyTextToClipboard;
