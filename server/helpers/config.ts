import * as winston from 'winston';

export const config = {
    secret: '6N2Ox6Yax4niOGUjgqHdI6bmvvsFYLhnNbHOD8bFENdAT3J8Air9u6ckwUAZYlJVdMvsQpPk7VKyBt0KkHkv8iZ7sZJcnxIU',
    winston: {
        transports: [
            new winston.transports.Console({
                json: true,
                colorize: true
            }),
            new winston.transports.File({
                level: 'info',
                filename: `./logs/app.log`,
                handleExceptions: true,
                json: true,
                maxsize: 5242880, // 5MB
                maxFiles: 5,
                colorize: false
            })
        ],
        meta: true, // optional: control whether you want to log the meta data about the request (default to true)
        msg: 'HTTP {{req.method}} {{req.url}}', // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
        expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
        colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
        ignoreRoute: function(req, res) {
            return false;
        } // optional: allows to skip some log messages based on request and/or response
    }
};
