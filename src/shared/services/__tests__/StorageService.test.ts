import { StorageService, StorageServiceKeys } from '../StorageService';

const mockReturnValues: any = {
  installationToken: 'token',
  profile: {
    name: 'name',
    email: 'email',
  },
};

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => new Promise((resolve) => {
    resolve(true);
  })),
  getItem: jest.fn((key) => new Promise((resolve) => {
    if (mockReturnValues[key]) {
      resolve(mockReturnValues[key]);
    } else {
      resolve(null);
    }
  })),
}));

describe('StorageService', () => {
  describe('method: setItem()', () => {
    it('should resolve a promise with no errors and return true when save data', async () => expect(
      StorageService.setItem({
        key: StorageServiceKeys.INSTALLATION_TOKEN,
        value: mockReturnValues.installationToken,
      }),
    ).resolves.toEqual(true));
  });

  describe('method: getItem()', () => {
    it('should resolve a promise and return saved data', async () => expect(
      StorageService.getItem({ key: StorageServiceKeys.INSTALLATION_TOKEN }),
    ).resolves.toEqual(mockReturnValues.installationToken));

    it('should return with no errors when key is found', async () => StorageService.getItem({
      key: StorageServiceKeys.INSTALLATION_TOKEN,
    }).catch((error) => {
      expect(error).toBeNull();
    }));

    it('should reject and return Error() when if key is not found', async () => expect(
      StorageService.getItem({ key: StorageServiceKeys.COOKIE }),
    ).rejects.toEqual(
      new Error(`No data found for key: ${StorageServiceKeys.COOKIE}`),
    ));
  });
});
