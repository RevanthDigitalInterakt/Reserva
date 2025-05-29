import Clipboard from '@react-native-clipboard/clipboard';
import { handleCopyTextToClipboard, getCopiedValue } from '../CopyToClipboard';

jest.mock('@react-native-clipboard/clipboard', () => ({
  setString: jest.fn(),
  getString: jest.fn(),
}));

describe('handleCopyTextToClipboard', () => {
  test('should call Clipboard.setString with the given text', () => {
    const text = 'Hello, world!';

    handleCopyTextToClipboard(text);

    expect(Clipboard.setString).toHaveBeenCalledWith(text);
  });

  it('should get string clipboard', async () => {
    await getCopiedValue();

    expect(Clipboard.getString).toHaveBeenCalled();
  });
});
