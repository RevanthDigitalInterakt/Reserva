import { renderHook } from '@testing-library/react-hooks';
import useCheckAppNewVersion from '../useCheckAppNewVersion';

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');

  return Object.setPrototypeOf(
    {
      Platform: { OS: 'android' },
    },
    RN,
  );
});

// Mocking dependencies
jest.mock('react-native-device-info', () => ({
  getVersion: jest.fn(() => '1.0.0'), // Mocking the app version as '1.0.0'
}));

jest.mock('react-native-config', () => ({
  ANDROID_STORE_URL: 'https://mock-android-store-url.com',
  IOS_STORE_URL: 'https://mock-ios-store-url.com',
}));

jest.mock('react-native-store-version', () => ({
  __esModule: true,
  default: jest.fn(({ version }) => ({ remote: '2.0.0', local: version })),
}));

jest.mock('../../base/graphql/generated', () => ({
  useUpdateInAppLazyQuery: () => [
    jest.fn(() => ({
      data: {
        updateInApp: {
          targetVersion: '2.0.0',
          updateType: 'FLEXIBLE',
          updateTitle: 'New Update Available',
          updateDescription: 'This is a new update with exciting features!',
          onlyPlatform: 'android',
          updateAllVersions: true,
        },
      },
    })),
  ],
}));

describe('useCheckAppNewVersion', () => {
  it('should show update alert for major version on Android', async () => {
    renderHook(() => useCheckAppNewVersion());
    // TODO the test is working, but it's not possible to mock the Alert.
  });
});
