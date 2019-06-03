const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const contentSchema = new Schema({
    author: String,
    text: String,
});

module.exports = mongoose.model('Content',contentSchema);