const mongoose = require('mongoose');
const host = '127.0.0.1';
const db = 'banking'
const connectionUri = `mongodb://${host}/${db}`;

mongoose.connect(connectionUri);
mongoose.Promise = Promise;

mongoose.connection.once('open', () => console.log('connected!'));

module.exports.Client = require("./models/client/client.model");
// module.exports.Account = require("./models/account");
// module.exports.Transaction = require("./models/transaction");