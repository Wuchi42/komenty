const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');
const Comment = require('./comment');

const articleSchema = new Schema({
    title: String,
    comments: [Comment.schema]
});
articleSchema.plugin(timestamps);

module.exports = mongoose.model('Article',articleSchema);