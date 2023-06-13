const { gherkin, include } = require('./features');

exports.config = {
  output: './output',
  helpers: {
    Appium: {
      platform: process.env.PLATFORM,
      app: process.env.APP,
      desiredCapabilities: {
        deviceName: process.env.DEVICE,
        plataformVersion: process.env.VERSION,
        automationName: process.env.AUTOMATION,
        appPackage:
          process.env.PLATFORM === 'Android' ? process.env.PACKAGE : '',
        appActivity:
        process.env.PLATFORM === 'Android' ? process.env.ACTIVITY : '',
      },
    },
  },
  include,
  mocha: {},
  bootstrap: null,
  timeout: null,
  teardown: null,
  hooks: [],
  gherkin,
  plugins: {
    screenshotOnFail: {
      enabled: false,
    },
    retryFailedStep: {
      enabled: true,
    },
  },
  name: 'regression-app',
};
