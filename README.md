# ZDI Angular Styleguide - Sample Project

This project serves as a sample project to showcase the guidelines provided in the ZDI Angular Styleguide (which will be published soon).

It is a simplistic shop that offers delicious ice cream :icecream:

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`.
The app will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the project.
The build artifacts will be stored in the `dist/` directory.
Use the `--prod` flag for a production build.

## Running unit tests

Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

### WebdriverIO / Playwright

To execute the [WebdriverIO](https://webdriver.io/) or [Playwright](https://playwright.dev/) tests, ensure the application is running.
Use `npm start` to run the application.

Run `npm run e2e:wdio` to execute the end-to-end tests via WebdriverIO.

Run `npm run e2e:playwright` to execute the end-to-end tests via Playwright.

## Running layout tests

Run `npm run galen` to run layout tests using the [Galen Framework](http://galenframework.com/).
This requires to have Java installed on the executing host.

## Code formatting

This project uses [Prettier](https://prettier.io) as a code formatter.
It is configured to run as a pre-commit hook on staged files to ensure the code in the repository is always properly formatted.

# License

The application is released using the MIT license. For more information see the [license file](./LICENSE).
