const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');


const commentSchema = new Schema({
    avatar: String,
    author: String,
    text: String
});
commentSchema.plugin(timestamps);

module.exports = mongoose.model('Comment',commentSchema);