import { enableProdMode } from '@angular/core';
// Express Engine
import { ngExpressEngine } from '@nguniversal/express-engine';
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as expressWinston from 'express-winston';
import * as mongoose from 'mongoose';
import { join } from 'path';
import 'reflect-metadata';
import 'zone.js/dist/zone-node';
import { routes } from './server/controllers/index';
import { initSocket } from './server/controllers/socket/socket';
import { config } from './server/helpers/config';
import { ErrorHandler } from './server/helpers/errorHandlers';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

// const server = require('http').createServer();
// const io = require('socket.io')(server);
// console.log(io);

// server.listen(3000);

// Socket IO
const chat = initSocket(app);

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');

const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main');

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)

app.engine(
    'html',
    ngExpressEngine({
        bootstrap: AppServerModuleNgFactory,
        providers: [provideModuleMap(LAZY_MODULE_MAP)]
    })
);

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));
app.use(ErrorHandler.logErrors);
app.use(ErrorHandler.clientErrorHandler);
app.use(ErrorHandler.errorHandler);

app.use(bodyParser.json());

// Winston Logger
app.use(expressWinston.logger(config.winston));

// DB
mongoose.connect('mongodb://localhost:27017');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('DB success run');
});

// Routes
app.use('/api', routes);

// Server static files from /browser
app.get(
    '*.*',
    express.static(join(DIST_FOLDER, 'browser'), {
        maxAge: '1y'
    })
);

// ALl regular routes use the Universal engine
app.get('*', (req, res) => {
    res.render('index', {
        req,
        res,
        preboot: false, // turn on if using preboot
        baseUrl: '/',
        requestUrl: req.originalUrl,
        originUrl: `http://localhost:${app.get('port')}`
    });
});

// Start up the Node server
app.listen(PORT, () => {
    console.log(`Node Express server listening vlad on http://localhost:${PORT}`);
});
