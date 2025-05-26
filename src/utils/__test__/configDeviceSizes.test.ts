import configDeviceSizes from '../configDeviceSizes';

jest.mock('react-native', () => ({
  Dimensions: {
    get: jest.fn().mockReturnValue({
      width: 320,
      height: 480,
    }),
  },
}));

describe('dimensions', () => {
  test('should have DEVICE_WIDTH and DEVICE_HEIGHT with correct values', () => {
    expect(configDeviceSizes.DEVICE_WIDTH).toBe(320);
    expect(configDeviceSizes.DEVICE_HEIGHT).toBe(480);
  });
});
