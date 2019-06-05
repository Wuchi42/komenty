const assert = require('assert');
const Article = require('../models/article');
let art;
describe('find all articles',function () {

   it('find all articles',function (done) {
       art = new Article({
           title: 'React',
           comments: [
               {
                   avatar : "https://scontent.fprg1-1.fna.fbcdn.net/v/t1.0-9/37528094_10204918782887188_8597874629320638464_n.jpg?_nc_cat=102&_nc_ht=scontent.fprg1-1.fna&oh=2da46aa4c6250dedc605775189a0a679&oe=5D553805",
                   author: "Jsme Wuči",
                   text: "Čahoj světoune"
               },
               {
                   avatar : "https://scontent.fprg1-1.fna.fbcdn.net/v/t1.0-9/37528094_10204918782887188_8597874629320638464_n.jpg?_nc_cat=102&_nc_ht=scontent.fprg1-1.fna&oh=2da46aa4c6250dedc605775189a0a679&oe=5D553805",
                   author: "Nejsme vůči",
                   text: "Konec se blíží"
               }
           ]
       });
       art.save().then(function () {
       Article.find({}).then(function (resolve) {
           console.log(resolve.length);
           assert(resolve.length > 0);
           done();
       });
       });
   });
});