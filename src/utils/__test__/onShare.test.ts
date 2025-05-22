import Share from 'react-native-share';
import { onShare } from '../onShare';

// Crie um mock para a função Share.open
jest.mock('react-native-share', () => ({
  open: jest.fn(() => Promise.resolve()),
}));

describe('onShare', () => {
  test('should call Share.open with the correct parameters', () => {
    const title = 'Test Title';
    const message = 'Test Message';
    const url = 'https://example.com';

    onShare(title, message, url);

    expect(Share.open).toHaveBeenCalledWith({ title, message, url });
  });
});
