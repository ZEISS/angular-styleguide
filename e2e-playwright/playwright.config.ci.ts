/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  webServer: {
    command: 'npm start',
    port: 4200,
    timeout: 150 * 1000,
  },
  use: {
    headless: true,
  },
  projects: [
    {
      name: 'Desktop Chrome',
      use: devices['Desktop Chrome'],
    },
    {
      name: 'Desktop Safari',
      use: {
        ...devices['Desktop Safari'],
        viewport: { width: 1200, height: 750 },
      },
    },
    // TODO Firefox currently not working (March 2022), see https://t.ly/seTd [SB]
    {
      name: 'Desktop Firefox',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 800, height: 600 },
      },
    },
    // // Test against mobile viewports.
    {
      name: 'Mobile Chrome',
      use: devices['Pixel 5'],
    },
    {
      name: 'Mobile Safari',
      use: devices['iPhone 13'],
    },
  ],
};
export default config;

export const baseUrl: string = 'https://bs-local.com:4200';
