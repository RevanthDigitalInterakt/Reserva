import { removeLastCharacterSlash } from '../../removeLastCharacterSlash';
import { deepLinkHelper } from '../deepLinkHelper';
import { registerMethods } from '../static/deepLinkMethods';

jest.mock('../../removeLastCharacterSlash');
jest.mock('../static/deepLinkMethods', () => ({
  registerMethods: [
    jest.fn(async (_url: string) => ({ match: false })),
  ],
}));

describe('deepLinkHelper', () => {
  beforeEach(() => {
    (removeLastCharacterSlash as jest.Mock).mockClear();
    (registerMethods[0] as jest.Mock).mockClear();
  });

  it('should be remove the last character slash from the URL', async () => {
    (removeLastCharacterSlash as jest.Mock).mockReturnValue('test-url');
    (registerMethods[0] as jest.Mock).mockResolvedValue({ match: false });

    const result = await deepLinkHelper('test-url/');

    expect(removeLastCharacterSlash).toHaveBeenCalledWith('test-url/');
    expect(result).toBeUndefined();
  });

  it('should be return undefined if no method matches', async () => {
    (removeLastCharacterSlash as jest.Mock).mockReturnValue('test-url');
    (registerMethods[0] as jest.Mock).mockResolvedValue({ match: false });

    const result = await deepLinkHelper('test-url');

    expect(result).toBeUndefined();
  });

  it('should be return the URL if a method matches', async () => {
    (removeLastCharacterSlash as jest.Mock).mockReturnValue('test-url');
    (registerMethods[0] as jest.Mock).mockResolvedValue({ match: true, strUrl: 'matched-url' });

    const result = await deepLinkHelper('test-url');

    expect(result).toBe('matched-url');
  });

  it('should be return the first matched URL if multiple methods match', async () => {
    (removeLastCharacterSlash as jest.Mock).mockReturnValue('test-url');
    (registerMethods[0] as jest.Mock).mockResolvedValueOnce({ match: true, strUrl: 'first-matched-url' });
    (registerMethods.push(jest.fn(async (_url: string) => ({
      match: true,
      strUrl: 'second-matched-url',
    }))) as unknown as jest.Mock);

    const result = await deepLinkHelper('test-url');

    expect(result).toBe('first-matched-url');
  });
});
