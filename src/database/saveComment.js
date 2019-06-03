// const mongoose = require('mongoose');
// // ES6 promise
// mongoose.Promise = global.Promise;
//
// const uri = "mongodb+srv://weisee:123@kosmonauti-hgnah.mongodb.net/databaseKosmonauti?retryWrites=true";
// // connect before test run
// function connect (done) {
//     // connect to mongodb
//     mongoose.connect(uri,{useNewUrlParser:true,useFindAndModify: false});
//     mongoose.connection.once('open',function () {
//         console.log('Connection succesfull');
//         done();
//     }).on('error',function (error) {
//         console.log('Connection error:'+error);
//     });
// }
//
//
