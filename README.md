# WorkschainFront

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0.
## Before Start
> setup project and run `npm install`

> install `node, npm, angular cli` and `forever` in globally 

> Run `npm run init-params` for generating configuration files

## Run Project

> build Project  `npm start` or `npm run server` if is building
but check is stopped last `forever` script

> ----RECOMMEND---- run `npm run ssr-check`, check is work node, if success, close node and 
run `forever start server.js`

> `forever list` shows all forever scripts. copy id of script and run
`forever stop {id}` to stopping listener  

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

##Create Component
`ng g c componentname --module=modulname.module --style scss`
