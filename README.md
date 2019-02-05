# Starting11

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.0.

## Structure of the project

This is a normal Angular 7 project containing a basic Express server (for the API that allows for creating and retrieval of teams)
- e2e/ folder that contains the e2e tests, in this case validating that the jersey svg has loaded
- server/ Contains the express app in the file (server.ts)
- src/ Contains the Angular code 
- src/app Contains the code for the Angular app
- src/app Contains the assets for the app

## Requirements

- Node greater that 8.10.0
- Angular Cli: `npm -g install @angular/cli`

## Getting Started

- Run `npm install` in the root directory and inside the server/ directory

## Development server

Run `npm run` for a dev server for both the Angular app and the Express server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running end-to-end tests

Run `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/) and also execute the Express server

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
