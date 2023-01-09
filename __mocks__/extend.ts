jest.mock('@react-native-community/async-storage', () => (
  jest.requireActual('@react-native-community/async-storage/jest/async-storage-mock')
));

jest.mock('react-native-onesignal', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  inFocusDisplaying: jest.fn(),
  getTags: (callback: (handle: {
    [key: string]: string;
  } | null) => void) => callback({ tag: 'value' }),
  setExternalUserId: jest.fn(),
  sendTags: jest.fn(),
  getDeviceState: jest.fn(),
  removeExternalUserId: jest.fn(),
}));

jest.mock('react-native-appsflyer', () => ({
  logEvent: jest.fn(),
}));

jest.mock('@react-native-firebase/analytics', () => () => ({
  logEvent: jest.fn(),
}));
