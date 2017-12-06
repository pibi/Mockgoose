"use strict";

var expect = require('chai').expect;

describe('callback', function todoDescribe() {
  var Mongoose = require('mongoose').Mongoose;
  var Mockgoose = require('../built/mockgoose-fix').Mockgoose;
  var mongoose = new Mongoose();
  var mockgoose = new Mockgoose(mongoose);
  mockgoose.helper.setDbVersion('3.4.3');
  mongoose.Promise = global.Promise;
  
  it('should return native connection object', function(done) {
  	mockgoose.prepareStorage().then(function() {
    	    var connection = mongoose.createConnection('mongodb://localhost/mydb');
            expect(typeof connection).to.equal('object'); 
            expect(connection.constructor.name).to.equal('NativeConnection'); 
            done();
	});
  });

});
