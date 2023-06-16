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
  include: {
    I: './steps_file.js',
    loginPage: './features/pages/login_page.js',
    homePage: './features/pages/home_page.js',
    bagPage: './features/pages/bag_page.js',
  },
  include,
  mocha: {},
  bootstrap: null,
  timeout: null,
  teardown: null,
  hooks: [],
  gherkin: {
    features: './features/specs/*.feature',
    steps: ['./features/step_definitions/login_steps.js', './features/step_definitions/bag_steps.js'],
  },
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
