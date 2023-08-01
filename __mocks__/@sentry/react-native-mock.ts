// __mocks__/@sentry/react-native.js

const SentryReactNative = {
  captureException: jest.fn(),
  setUser: jest.fn(),
  setTagsContext: jest.fn(),
  setExtraContext: jest.fn(),
  captureBreadcrumb: jest.fn(),
};

export default SentryReactNative;
