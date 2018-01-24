const mongoose = require('mongoose');
const collectionName = 'transactions';
const modelName = 'Transaction';
const schema = require('./transaction.schema');
const model = mongoose.model(modelName, schema, collectionName);


function beforeSave(next) {
    if (!this.isNew) return next();
    const fromAccount = this.from;
    const transactionValue = this.value;
    console.log("a", fromAccount);
    console.log("b", transactionValue);
    const Account = model.model("Account");

    Account.findById(fromAccount)
        .where("balance").gt(transactionValue)
        .then(account => {
            if (!account) {
                this.status = "abortado";
                this.msg = "Saldo insuficiente.";
            } else {
                this.status = "processando";
            }
            next();
        })
        .catch(e => {
            this.msg = "Erro durante processamento.";
            next();
        })

    //verificar se a conta FR0M possui saldo suficiente
    //se nao possuir throw new Error("saldo insuficiente")
    //atualizar status
}

function afterSave(doc, next) {
    const Account = model.model("Account");
    // console.log(doc);
    if (this.status != "processando") return next();

    const fromAccount = this.from;
    const toAccount = this.to;
    const transactionValue = this.value;
    let promises = [Account.findById(fromAccount), Account.findById(toAccount)];
    Promise.all(promises)
        .then(results => ({ from: results[0], to: results[1] }))
        .then(accounts => {
            accounts.from.balance -= transactionValue;
            accounts.to.balance += transactionValue;
            promises = [accounts.from.save(), accounts.to.save()];
            return Promise.all(promises);
        })
        .then(results => model.updateOne({ _id: this._id }, { status: "completado" }))
        .then(() => next())
        .catch(e => {
            model.updateOne({ _id: this._id }, { status: "abortado", msg: "Erro durante o processamento." })
                .then(() => next());
        })

}

schema.pre('save', beforeSave)
    .post('save', afterSave);

module.exports = model;