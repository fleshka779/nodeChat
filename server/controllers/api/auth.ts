import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { config } from '../../helpers/config';
import { User } from '../../models/user';

const userRouter = express.Router();
const authRouter = express.Router();

/**
 * Register
 */
authRouter.post('/register', function(req, res, next) {
    if (!req.body.email || !req.body.password) {
        return next('Invalid Params');
    }

    const newUser = new User(req.body);

    newUser.setPassword(req.body.password);

    newUser.save((err, user) => {
        if (err) return next(err);

        const payload = {
            admin: false
        };

        const token = jwt.sign(payload, config.secret, {
            expiresIn: 86400 * 7 // expires in 7 days
        });

        user.removeHashDataFromRes();

        res.json({
            success: true,
            user: user,
            token: token
        });
    });
});

/**
 * Login
 */
authRouter.post('/login', function(req, res, next) {
    if (!req.body.email || !req.body.password) {
        return next('Invalid params.');
    }

    User.findOne(
        {
            email: req.body.email
        },
        function(err, user) {
            if (err) return next(err);

            if (!user) {
                return next('Authentication failed. User not found.');
            } else if (user) {
                // check if password matches
                if (!user.validPassword(req.body.password)) {
                    return next('Authentication failed. Wrong password.');
                } else {
                    try {
                        const payload = {
                            admin: false
                        };

                        const token = jwt.sign(payload, config.secret, {
                            expiresIn: 86400 * 7 // expires in 7 days
                        });

                        user.removeHashDataFromRes();

                        res.json({
                            success: true,
                            user: user,
                            token: token
                        });
                    } catch (error) {
                        return next(err);
                    }
                }
            }
        }
    );
});

export { authRouter };
