export class ErrorHandler {
    static logErrors(err, req, res, next) {
        console.error(err.stack);
        next(err);
    }

    static clientErrorHandler(err, req, res, next) {
        if (req.xhr) {
            res.status(500).send({ error: err });
        } else {
            next(err);
        }
    }

    static errorHandler(err, req, res, next) {
        console.log('Error handler');
        res.status(500).send({ error: err });
    }
}
