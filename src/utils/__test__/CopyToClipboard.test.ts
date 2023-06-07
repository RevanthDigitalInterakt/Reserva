import Clipboard from '@react-native-community/clipboard';
import handleCopyTextToClipboard from '../CopyToClipboard';

jest.mock('@react-native-community/clipboard', () => ({
  setString: jest.fn(),
}));

describe('handleCopyTextToClipboard', () => {
  test('should call Clipboard.setString with the given text', () => {
    const text = 'Hello, world!';

    handleCopyTextToClipboard(text);

    expect(Clipboard.setString).toHaveBeenCalledWith(text);
  });
});
