const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Article = require('./models/article');
const Comment = require('./models/comment');
const dbRoute =require('../frontend/src/nodemon').mongoA.whole;
const {ObjectId} = require('mongodb').ObjectID;
const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();
// this is MongoDB route
// connects back end code with the database
// and here the database is plus some shout out to console
mongoose.connect(dbRoute, { useNewUrlParser: true });
mongoose.connection.once('open', () => console.log('connected to the database'));

// checks connection
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));
// GET METHOD fetches all available data from DB
router.get('/getArticles', (req, res) => {
    Article.find((err, articles) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, articles: articles });
    });
});
// UPDATE METHOD from DB
router.post('/updateArticle', (req, res) => {
    const { id, update } = req.body;
    Article.findByIdAndUpdate(id, update, (err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});
router.post('/addCommentToArticle',(req,res)=>{
    const {id,update} = req.body;
    const objID = new ObjectId();
    objID.id = id;
    const com = new Comment(update.message);
    console.log(objID.id);
    Article.find({_id:objID.id}).then( function (record) {
        record[0].comments.push(com);
        record[0].save();
        return res.json({ success: true });
    }
    )
});
// DELETE METHOD from DB
router.delete('/deleteArticle', (req, res) => {
    const { id } = req.body;
    Article.findByIdAndRemove(id, (err) => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
});
// CREATE METHOD to DB
router.post('/putArticle', (req, res) => {
    let article = new Article();

    const { id, message } = req.body;

    if ((!id && id !== 0) || !message) {
        return res.json({
            success: false,
            error: 'INVALID INPUTS',
        });
    }
    article.message = message;
    article._id = id;
    article.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});
// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));