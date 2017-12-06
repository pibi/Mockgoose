const mongoose = require('mongoose');
const path = require('path');
const Mockgoose = require('../built/mockgoose-fix').Mockgoose;
const expect = require('chai').expect;
const mockgoose = new Mockgoose(mongoose);

mockgoose.helper.setDbVersion('3.4.3');
mongoose.Promise = global.Promise;

const CatSchema = new mongoose.Schema({name: String});
let Cat1;
let Cat2;

// create connection to first database
describe('bug 15', function () {

  before("DB1 connection", (done) => {
    mockgoose.prepareStorage().then(function () {
      var db1 = mongoose.createConnection("mongodb://barbaz", {user: "fakeUser", password: "fakePass"}, (err, res) => {
        if (err) throw err;
        Cat1 = db1.model('Cat', CatSchema);
        done(err);
      });
    }, function (e) {
      done(e);
    });
  });

  // create connection to second database
  before("DB2 connection", (done) => {
    mockgoose.prepareStorage().then(function () {
      var db2 = mongoose.createConnection("mongodb://foobar", {user: "fakeUser", password: "fakePass"}, (err, res) => {
        if (err) throw err;
        Cat2 = db2.model('Cat', CatSchema);
        done(err);
      });
    }, function (e) {
      done(e);
    });
  });

  it("should create a cat foo", function (done) {
    Cat1.create({
      name: "foo"
    }, function (err, cat) {
      expect(err).to.be.falsy;
      done(err);
    });
  });

  it("should find cat foo", function (done) {
    Cat1.findOne({name: "foo"}, function (err, cat) {
      expect(err).to.be.falsy;
      done(err);
    });
  });

  // remove collections from a temporary store
  after("Drop db", (done) => {
    // Here is when the error is trigged
    mockgoose.helper.reset().then(function () {
      done();
    });
  });
});
