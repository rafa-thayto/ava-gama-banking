const mongoose = require('mongoose');
const collectionName = 'transactions';
const modelName = 'Transaction';
const schema = require('./transaction.schema');

function beforeSave(next){
    if (!this.isNew) return next();
    //verificar se a conta FR0M possui saldo suficiente
    //se nao possuir throw new Error("saldo insuficiente")
    //atualizar status
    next();
}

function afterSave(next){
    //atualizar saldo da conta FROM e TO
    next();
}

schema.pre('save', beforeSave);

module.exports = mongoose.model(modelName, schema, collectionName);