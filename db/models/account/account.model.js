const mongoose = require('mongoose');
const collectionName = 'accounts';
const modelName = 'Account';
const schema = require('./account.schema');

module.exports = mongoose.model(modelName, schema, collectionName);
