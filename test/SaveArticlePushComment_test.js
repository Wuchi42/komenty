const assert = require('assert');
const Article = require('../src/models/article');
const Comment = require('../src/models/comment');
//describe test
describe('Saving article to db',function () {
    //create test
    var com;
    var art;

    it('save comment to article',function (done) {
        com = new Comment({
            avatar : "https://scontent.fprg1-1.fna.fbcdn.net/v/t1.0-9/37528094_10204918782887188_8597874629320638464_n.jpg?_nc_cat=102&_nc_ht=scontent.fprg1-1.fna&oh=2da46aa4c6250dedc605775189a0a679&oe=5D553805",
            content: {
                author: "Jsme Wuči",
                text: "Čahoj světoune",
            }
        });
        art = new Article({
            title: 'React',
            comments: [{
                avatar : "https://scontent.fprg1-1.fna.fbcdn.net/v/t1.0-9/37528094_10204918782887188_8597874629320638464_n.jpg?_nc_cat=102&_nc_ht=scontent.fprg1-1.fna&oh=2da46aa4c6250dedc605775189a0a679&oe=5D553805",
                content: {
                    author: "Jsme Wuči",
                    text: "Čahoj světoune",
                }}]

        });

        art.save().then(function () {
            Article.findOne({_id:art._id}).then(function (record) {
                console.log(record.comments.length);
                    assert(record.comments.length ===1);
                    done();
                });
        });

});
    it('pushes comment to article',function (done) {
        com = new Comment({
            avatar : "https://scontent.fprg1-1.fna.fbcdn.net/v/t1.0-9/37528094_10204918782887188_8597874629320638464_n.jpg?_nc_cat=102&_nc_ht=scontent.fprg1-1.fna&oh=2da46aa4c6250dedc605775189a0a679&oe=5D553805",
            content: {
                author: "Jsme Wuči",
                text: "Čahoj světoune",
            }
        });
        art = new Article({
            title: 'React'
        });

        art.save().then(function () {
            Article.findOne({_id:art._id}).then(function (record) {
                record.comments.push(com);
                record.save().then(function () {
                    Article.findOne({_id:art._id}).then(function (result) {
                        assert(result.comments.length === 1)
                        done();
                    });
                });
            });
        });

    });
});