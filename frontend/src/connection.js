const express = require("express");
let app = express();
var cors = require('cors');
app.use(express.static('public'));
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>console.info("Server started on port: "+PORT));
app.use(cors());






















// srv=require("nodemon").mongoA;
// const mongoose = require('mongoose');
// // ES6 promise
// mongoose.Promise = global.Promise;
//
// const uri = srv.whole;
// // connect before test run
// before(function (done) {
//     // connect to mongodb
//     mongoose.connect(uri,{useNewUrlParser:true,useFindAndModify: false});
//     mongoose.connection.once('open',function () {
//         console.log('Connection succesfull');
//         mongoose.connection.collections.comments.drop && mongoose.connection.collections.articles.drop(function () {
//             done();
//         });
//     }).on('error',function (error) {
//         console.log('Connection error:'+error);
//     });
//
// });
// // beforeEach(function (done) {
// //     mongoose.connection.collections.comments.drop && mongoose.connection.collections.articles.drop(function () {
// //         done();
// //     });
// //
// // });