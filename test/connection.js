const mongoose = require('mongoose');
// ES6 promise
mongoose.Promise = global.Promise;

const uri = "mongodb+srv://weisee:123@kosmonauti-hgnah.mongodb.net/databaseKomenty?retryWrites=true";
// connect before test run
before(function (done) {
    // connect to mongodb
    mongoose.connect(uri,{useNewUrlParser:true,useFindAndModify: false});
    mongoose.connection.once('open',function () {
        console.log('Connection succesfull');
        mongoose.connection.collections.comments.drop && mongoose.connection.collections.articles.drop(function () {
            done();
        });
    }).on('error',function (error) {
        console.log('Connection error:'+error);
    });

});
// beforeEach(function (done) {
//     mongoose.connection.collections.comments.drop && mongoose.connection.collections.articles.drop(function () {
//         done();
//     });
//
// });