import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { config } from '../helpers/config';
import { authRouter } from './api/auth';
import { postRouter } from './api/posts';

const routes = express.Router();

routes.use('/auth', authRouter);

// TODO: route middleware to verify a token
routes.use(function(req: any, res, next) {
    // check header or url parameters or post parameters for token
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.secret, function(err, decoded) {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message:
                        err.name && err.message
                            ? `${err.name} : ${err.message}`
                            : 'Failed to authenticate token! Unauthorized user!'
                });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});

routes.use('/posts', postRouter);

export { routes };
