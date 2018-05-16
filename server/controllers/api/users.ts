import * as express from 'express';
const userRouter = express.Router();

userRouter.get('/getAll', function(req, res) {
    res.json({ text: 'Hello World' });
});

export { userRouter };
