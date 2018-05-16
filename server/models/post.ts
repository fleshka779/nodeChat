import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    category: {
        type: String,
        required: false
    },
    author: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    url: {
        type: String,
        required: false
    },
    urlToImage: {
        type: String,
        required: false
    },
    publishedAt: {
        type: String,
        required: false
    }
});

PostSchema.statics.saveAll = function(array: any[]) {
    this.create(array, function(err) {
        if (err) {
            throw new Error('Error save colletion of posts');
        }
    });
};

const postModel = mongoose.model('Post', PostSchema);

export { postModel };
