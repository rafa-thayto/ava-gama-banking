const mongoose = require('mongoose');
const collectionName = 'logs';
const modelName = 'Log';
const schema = require('./log.schema');

schema.statics.log = function log(level, key, token, sourceIp, data) {
    const doc = { level, key, token, sourceIp, data, date: new Date() };
    this.collection.insertOne(doc).then(() => true).catch(() => true);
}

schema.statics.info = function logInfo(key, token, sourceIp, data) {
    this.log('info', key, token, sourceIp, data);
}

schema.statics.warn = function logWarn(key, token, sourceIp, data) {
    this.log('warn', key, token, sourceIp, data);
}

schema.statics.error = function logError(key, token, sourceIp, data) {
    this.log('error', key, token, sourceIp, data);
}

module.exports = mongoose.model(modelName, schema, collectionName);
