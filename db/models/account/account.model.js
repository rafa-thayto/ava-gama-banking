const mongoose = require('mongoose');
const collectionName = 'accounts';
const modelName = 'Account';
const schema = require('./account.schema');

schema.statics.findTransactionsByAccount = function findTransactionsByAccount(agencia, accountNumber) {
    return this.findOne({ account_number: accountNumber, ag: agencia })
               .lean()
               .then(account => this.model("Transaction").find({
                        $or: [
                          {from: account._id}, {to: account._id}
                         ]
                     }).populate('from to'))
}

module.exports = mongoose.model(modelName, schema, collectionName);
