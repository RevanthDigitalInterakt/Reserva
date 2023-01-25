import Clipboard from '@react-native-community/clipboard';
import handleCopyTextToClipboard from '../CopyToClipboard';

describe('handleCopyTextToClipboard test', () => {
  it('should set string on users\' clipboard', () => {
    handleCopyTextToClipboard('teste');

    expect(Clipboard.setString).toHaveBeenCalledWith('teste');
    expect(Clipboard.setString).toHaveBeenCalledTimes(1);
  });
});
