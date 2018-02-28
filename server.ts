import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import {enableProdMode} from '@angular/core';

import * as express from 'express';
import {join} from 'path';
import {readFileSync} from 'fs';
// Express Engine
import {ngExpressEngine} from '@nguniversal/express-engine';
// Import module map for lazy loading
import {provideModuleMap} from '@nguniversal/module-map-ngfactory-loader';

const compression = require('compression');

const fs = require('fs');

//
const params = require('./server.parameters');
const db = require('./db');

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();


// ======================REDIRECT TO SSL IF ENABLED=====================
if (params.use_ssl) {
  // set up a route to redirect http to https
  let http = express();

  http.get('*', function (req, res) {
    res.redirect(`https://${params.domain}:${params.https_port}` + req.url);
  });

  // have it listen on 8080
  http.listen(params.http_port);
}

// =====================================================================

function angularRouter(req, res) {
  res.render('index', {
    req,
    res,
    providers: [{
      provide: 'serverUrl',
      useValue: `${req.protocol}://${req.get('host')}`
    }]
  });
}

// =====================================================================

// Express server
const app = express();


// add logger
const morgan = require('morgan');

// create a write stream (in append mode)
const LOG_FOLDER = join(process.cwd(), 'log');

if (!fs.existsSync(LOG_FOLDER)) {
  fs.mkdirSync(LOG_FOLDER);
}

const accessLogStream = fs.createWriteStream(join(LOG_FOLDER, '/access.log'), {flags: 'a'});

// setup the logger
app.use(morgan('combined', {stream: accessLogStream}));


// ===========================COMPRESSION===============================
app.use(compression({filter: shouldCompress}));

function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false;
  }

  // fallback to standard filter function
  return compression.filter(req, res);
}

// =====================================================================

// const PORT = process.env.PORT || 3000;
const DIST_FOLDER = join(process.cwd(), 'dist');

// Our index.html we'll use as our template
const template = readFileSync(join(DIST_FOLDER, 'browser', 'index.html')).toString();

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require('./dist/server/main.bundle');


// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.get('/', angularRouter);

// =====================================================================
app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

/* - Example Express Rest API endpoints -
  app.get('/api/**', (req, res) => { });
*/

// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser'), {
  maxAge: '1y'
}));

app.get('*', angularRouter);

// =====================================================================
// ALl regular routes use the Universal engine
// app.get('*', (req, res) => {
//   res.render('index', {req});
// });

// Start up the Node server
// app.listen(PORT, () => {
//   console.log(`Node Express server listening on http://localhost:${PORT}`);
// });
// =====================================================================

// =====================================================================
if (params.use_ssl) {
  const credentials = {
    key: fs.readFileSync(params.certificate.key_path, 'utf8'),
    cert: fs.readFileSync(params.certificate.crt_path, 'utf8')
  };

  const httpsServer = require('https').createServer(credentials, app);
  httpsServer.listen(params.https_port, () => {
    console.log(`Listening on https://localhost:${params.https_port}`);
  });
} else {
  app.listen(params.http_port, () => {
    console.log(`Listening on http://localhost:${params.http_port}`);
  });
}
// =====================================================================
