const mongoose = require('mongoose');
const collectionName = 'clients';
const modelName = 'Client';
const schema = require('./client.schema');
/**
 * Localiza todas as contas de um cliente.
 * --exemplo de metodo de instancia
 */
schema.methods.findAccounts = function findAccounts() {
    return this.model('Account').find({ client: this._id });
};
/**
 * Localiza cliente pelo numero de sua conta.
 * --exemplo de metodo de classe
 */
schema.statics.findByAccountNumber = function findByAccountNumber(accountNumber) {
    return this.model('Account')
               .findOne({ number: accountNumber })
               .lean()
               .then(account => this.where("_id", account.client));
}

module.exports = mongoose.model(modelName, schema, collectionName);