import * as express from 'express';
import { postModel } from '../../models/post';
const postRouter = express.Router();

postRouter.get('/', function(req, res) {
    if (req.query.offset !== undefined && req.query.limit !== undefined) {
        console.log(`Offset: ${req.query.offset}`);
        console.log(`Limit: ${req.query.limit}`);
        postModel.find({}, { skip: +req.query.offset, limit: +req.query.limit }, (err, results) => {
            if (err) {
                return res.json({ success: false, error: err });
            }
            res.json({ success: true, posts: results });
        });
    } else {
        res.json({ success: false, error: 'Invalid Limit and Offset' });
    }
});

export { postRouter };
