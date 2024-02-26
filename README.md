# [ZDI Angular Styleguide](https://github.com/ZEISS/angular-styleguide/wiki) - Sample Project

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![REUSE status](https://api.reuse.software/badge/github.com/ZEISS/angular-styleguide)](https://api.reuse.software/info/github.com/ZEISS/angular-styleguide)

This project serves as a sample project to showcase the guidelines provided in the [ZDI Angular Styleguide](https://github.com/ZEISS/angular-styleguide/wiki).

It is a simplistic shop that offers delicious ice cream :icecream:

The newest build of the shop is deployed [here](https://zeiss.github.io/angular-styleguide/) via GitHub Pages.

To get a better understanding of the style guide example, it is recommended to look into the style guide which is hosted under the repositories [wiki page](https://github.com/ZEISS/angular-styleguide/wiki).

Almost the entire app is implemented by using the [Standalone Components](https://angular.io/guide/standalone-components) approach. To cover also the classical module-based approach and to showcase the integration of both concepts, the package `catalog` is implemented module-based completely.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`.
The app will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the project.
The build artifacts will be stored in the `dist/` directory.
Use the `--prod` flag for a production build.

Furthermore, you can find more information about the build and deployment process [here](BUILD_PIPELINE.md).

## Running unit tests

Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

### WebdriverIO / Playwright

To execute the [WebdriverIO](https://webdriver.io/) or [Playwright](https://playwright.dev/) tests, ensure the application is running.
Use `npm start` to run the application.

Run `npm run e2e:wdio` to execute the end-to-end tests via WebdriverIO.

Run `npm run e2e:playwright` to execute the end-to-end tests via Playwright.

Run `npm run e2e:playwright:ui` to start [Playwright UI Mode](https://playwright.dev/docs/test-ui-mode).

### Running Playwright tests with BrowserStack

Precondition: You need a BrowserStack account to get your username and access key: https://www.browserstack.com/docs/iaam/security/manage-access-keys.

Run tests with Github workflow:

- Follow the Github Guide (https://docs.github.com/en/actions/using-workflows/manually-running-a-workflow)
- The workflow that needs to be started is called `Run Playwright on Browserstack`
- Enter the BrowserStack credentials as input parameters.

## Running layout tests

Run `npm run galen` to run layout tests using the [Galen Framework](http://galenframework.com/).
This requires to have Java installed on the executing host.

## Code formatting

This project uses [Prettier](https://prettier.io) as a code formatter.
It is configured to run as a pre-commit hook on staged files to ensure the code in the repository is always properly formatted.

# License

The application is released using the MIT license. For more information see the [license file](./LICENSE).
