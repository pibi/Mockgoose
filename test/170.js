const mongoose = require('mongoose');
const path = require('path');
const Mockgoose = require(path.join(__dirname, '../built/mockgoose-fix')).Mockgoose;
const expect = require('chai').expect;

const mockgoose = new Mockgoose(mongoose);
mockgoose.helper.setDbVersion('3.4.3');
mongoose.Promise = global.Promise;

// BUG: will not show `Cannot find module 'this-module-not-found'` error
describe('bug 179', function () {
  before(function (done) {
    mockgoose.prepareStorage().then(function () {
      mongoose.connect('mongodb://foobar:27017/test', {useMongoClient: true}, function () {
        done();
      });
    });
  });
  it('should throw an error', function (done) {
    expect(function () {
      require('this-module-not-found')
    }).to.throw(/Cannot find module/);
    done();
  });

});
