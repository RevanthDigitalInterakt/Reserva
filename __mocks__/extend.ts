import fetch from 'jest-fetch-mock';

global.fetch = fetch;
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
  ...jest.requireActual('@react-native-firebase/analytics'),
  logEvent: jest.fn(),
}));

jest.mock('@react-native-firebase/messaging', () => ({
  hasPermission: jest.fn(() => Promise.resolve(true)),
  subscribeToTopic: jest.fn(),
  unsubscribeFromTopic: jest.fn(),
  requestPermission: jest.fn(() => Promise.resolve(true)),
  getToken: jest.fn(() => Promise.resolve('myMockToken')),
}));

jest.mock('@react-native-community/clipboard', () => ({
  setString: jest.fn(),
}));
