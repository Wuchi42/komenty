const assert = require('assert');
const Comment = require('../models/comment');
//describe test
describe('Reading comment from db',function () {
    //create test
let com;

beforeEach(function (done) {
    com = new Comment({
        avatar : "https://scontent.fprg1-1.fna.fbcdn.net/v/t1.0-9/37528094_10204918782887188_8597874629320638464_n.jpg?_nc_cat=102&_nc_ht=scontent.fprg1-1.fna&oh=2da46aa4c6250dedc605775189a0a679&oe=5D553805",
        author: "Jsme Wuči",
        text: "Čahoj světoune"
        }
    );
    com.save().then(function () {
        assert(com.isNew === false);
        done();
    });
});
    it('find one comment from db using _id parameter',function (done) {
        Comment.findOne({_id:com._id}).then(function (result) {
            assert(result._id.toString() === com._id.toString());
            console.log(result.createdAt);
            done();
        })
    });
});