const mongoose = require('mongoose');
const { Mockgoose } = require('./built/mockgoose-fix');
const {MongoDBDownload} = require('mongodb-download-https');

const mockgoose = new Mockgoose(mongoose);
mockgoose.helper.setDbVersion('3.4.3');


mockgoose.prepareStorage().then(() => {
    console.log('prepare storage ok', mongoose.mocked);
    mongoose.connect('mongodb://sdfsdfsdf:27017');

    mongoose.connection.on('connected', function () {
        console.log('Mongoose open');
    });
});
