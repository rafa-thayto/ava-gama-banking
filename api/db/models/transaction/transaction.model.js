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
        const res = await Promise.all([Account.findById(fromAccount), Account.findById(toAccount)]);
        const accounts = { from: res[0], to: res[1] };
        if (!accounts.from) {
            this.status = "abortado";
            this.msg = "Conta não localizada.";
            next();
        } else if (accounts.from.balance < transactionValue) {
            this.status = "abortado";
            this.msg = "Saldo insuficiente.";
            next();
        } else {
            this.status = "completado";
            await Account.collection.update({ '_id': fromAccount }, { $inc: { balance: -transactionValue } });
            await Account.collection.update({ '_id': toAccount }, { $inc: { balance: transactionValue } });
            next();
        }
    } catch (e) {
        this.status = "erro";
        this.msg = "Erro durante processamento.";
        next();
    }
}

schema.pre('save', beforeSave);

module.exports = model;