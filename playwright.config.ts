import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testMatch: ["tests/taskTests.test.ts","tests/userTests.test.ts","tests/automateDeleteTask.test.ts"],
  use:{
    baseURL: "http://stackadapt-interview.us-east-1.elasticbeanstalk.com/",
    headless: false,
    screenshot: 'only-on-failure',
  },
  reporter:[["html",{
    open: "always"}]]
};

export default config;
