const includes = {
  loginPage: './features/pages/login_page.js',
  homePage: './features/pages/home_page.js',
};

const gherkin = {
  features: './features/specs/*.feature',
  steps: ['./features/step_definitions/login_steps.js'],
};

export default {
  includes,
  gherkin,
};
