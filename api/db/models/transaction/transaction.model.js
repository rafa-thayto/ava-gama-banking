const mongoose = require('mongoose');
const collectionName = 'transactions';
const modelName = 'Transaction';
const schema = require('./transaction.schema');
const model = mongoose.model(modelName, schema, collectionName);


async function beforeSave(next) {
    if (!this.isNew) return next();
    const fromAccount = this.from;
    const toAccount = this.to;
    const transactionValue = this.value;
    const Account = model.model("Account");

    try {
        const res = await Account.collection.updateOne({ '_id': fromAccount, balance: { $gte: transactionValue } }, { $inc: { balance: -transactionValue } });
        if (res.result.ok === 0) throw new Error('i/o error');
        if (res.result.nModified === 0) {
            this.status = "abortado";
            this.msg = "Saldo insuficiente.";
        } else {
            await Account.collection.updateOne({ '_id': toAccount }, { $inc: { balance: transactionValue } });
            this.status = "completado";
        }
    } catch (e) {
        this.status = "erro";
        this.msg = "Erro durante processamento.";
    }
    next();
}

schema.pre('save', beforeSave);

module.exports = model;
