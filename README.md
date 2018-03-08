# ICO Platform 

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0.
## Before Start

> install [nodejs](https://nodejs.org), 

> Install [angular cli](https://www.npmjs.com/package/@angular/cli) 
```
npm install -g @angular/cli
```    
> Install [forever](https://www.npmjs.com/package/forever) 
```
npm install -g forever 
``` 
> clone and install dependencies
```
git clone git@github.com:PUBLIQNetwork/ico-platform-fe.git ico-platform-fe
cd ico-platform-fe
npm install
```
> Run the following command to generate configuration files. It will create configuration files: 
*server.parameters.js* and *src/environements/parameters.ts*. The first one contains urls which **must be updated with your URLs**.
The second one contains server-side-rendering parameters. 
```
npm run init-params
```
## Run Project

> build Project  `npm start` or `npm run server` if is building
but check is stopped last `forever` script

> ----RECOMMEND---- run `npm run ssr-check`, check is work node, if success, close node and 
run `forever start server.ts`

> `forever list` shows all forever scripts. copy id of script and run
`forever stop {id}` to stopping listener  

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

