const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');
const Content = require('./content');

const commentSchema = new Schema({
    avatar: String,
    content: Content.schema
});
commentSchema.plugin(timestamps);

module.exports = mongoose.model('Comment',commentSchema);