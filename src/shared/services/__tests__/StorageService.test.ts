import { StorageService, StorageServiceKeys } from '../StorageService';
import AsyncStorage from '@react-native-community/async-storage';

const mockReturnValues: any = {
  installationToken: 'token',
  profile: {
    name: 'name',
    email: 'email',
  },
};

jest.mock('@react-native-community/async-storage', () => {
  return {
    setItem: jest.fn(() => {
      return new Promise((resolve) => {
        resolve(true);
      });
    }),
    getItem: jest.fn((key) => {
      return new Promise((resolve) => {
        if (mockReturnValues[key]) {
          resolve(mockReturnValues[key]);
        } else {
          resolve(null);
        }
      });
    }),
  };
});

describe('StorageService', () => {
  describe('method: setItem()', () => {
    it.skip('should resolve a promise with no errors and return true when save data', async () => {
      return expect(
        StorageService.setItem({
          key: StorageServiceKeys.INSTALLATION_TOKEN,
          value: mockReturnValues.installationToken,
        })
      ).resolves.toEqual(true);
    });
  });

  describe('method: getItem()', () => {
    it.skip('should resolve a promise and return saved data', async () => {
      return expect(
        StorageService.getItem({ key: StorageServiceKeys.INSTALLATION_TOKEN })
      ).resolves.toEqual(mockReturnValues.installationToken);
    });

    it.skip('should return with no errors when key is found', async () => {
      return StorageService.getItem({
        key: StorageServiceKeys.INSTALLATION_TOKEN,
      }).catch((error) => {
        expect(error).toBeNull();
      });
    });

    it.skip('should reject and return Error() when if key is not found', async () => {
      return expect(
        StorageService.getItem({ key: StorageServiceKeys.COOKIE })
      ).rejects.toEqual(
        new Error(`No data found for key: ${StorageServiceKeys.COOKIE}`)
      );
    });
  });
});
