import * as express from 'express';
import { postRouter } from './api/posts';
import { userRouter } from './api/users';

const routes = express.Router();

routes.use('/users', userRouter);
routes.use('/posts', postRouter);

export { routes };
