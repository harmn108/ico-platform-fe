'use strict';

require('zone.js/dist/zone-node');
require('reflect-metadata');

const express = require('express');
const ngUniversal = require('@nguniversal/express-engine');
const appServer = require('./dist-server/main.bundle');
const params = require('./server.parameters');
const https = require('https');
const fs = require('fs');

// redirect all http to https if ssl is enabled
if (params.use_ssl) {
  // set up a route to redirect http to https
  const http = express();

  http.get('*', function (req, res) {
    res.redirect(`https://${params.domain}:${params.https_port}` + req.url)
  });

  // have it listen on 8080
  http.listen(params.http_port);
}



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

const app = express();

app.get('/', angularRouter);

app.use(express.static(`${__dirname}/dist`));

// app.get('/api', (req, res) => {
//   res.json({ data: 'Content from HTTP request.' });
// });

app.engine('html', ngUniversal.ngExpressEngine({
  bootstrap: appServer.AppServerModuleNgFactory
}));

app.set('view engine', 'html');
app.set('views', 'dist');


if (params.use_ssl) {
  const credentials = {
    key: fs.readFileSync(params.certificate.key_path, 'utf8'),
    cert: fs.readFileSync(params.certificate.crt_path, 'utf8')
  };

  const httpsServer = https.createServer(credentials, app);
  httpsServer.listen(params.https_port, () => {
      console.log(`Listening on https://localhost:${params.https_port}`);
  });
} else {
  app.listen(params.http_port, () => {
    console.log(`Listening on http://localhost:${params.http_port}`);
  });
}

// app.listen(3000, () => {
//   console.log(`Listening on http://localhost:3000`);
// });
