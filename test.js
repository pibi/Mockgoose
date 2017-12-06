var mongoose = require('mongoose');
let {Mockgoose} = require('./built/mockgoose-fix');

let mockgoose = new Mockgoose(mongoose);
mockgoose.helper.setDbVersion('3.4.3');
mongoose.Promise = global.Promise;

mockgoose.prepareStorage().then(() => {
    console.log('prepare storage ok', mongoose.mocked);
    mongoose.connect('mongodb://sdfsdfsdf:27017', {useMongoClient: true});

    mongoose.connection.on('connected', function () {
        console.log('Mongoose open');
    });
});
//var Mockgoose = require('./Mockgoose')(mongoose).then(function() {


//});
