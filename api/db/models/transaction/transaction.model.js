const mongoose = require('mongoose');
const collectionName = 'transactions';
const modelName = 'Transaction';
const schema = require('./transaction.schema');
const model = mongoose.model(modelName, schema, collectionName);


function beforeSave(next) {
    if (!this.isNew) return next();
    const fromAccount = this.from;
    const toAccount = this.to;
    const transactionValue = this.value;
    const Account = model.model("Account");

    Promise.all([Account.findById(fromAccount), Account.findById(toAccount)])
        .then(res => { return { from: res[0], to: res[1] } })
        .then(accounts => {
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
                accounts.from.balance -= transactionValue;
                accounts.to.balance += transactionValue;
                Promise.all([accounts.from.save(), accounts.to.save()]).then(() => next());
            }
        })
        .catch(e => {
            this.msg = "Erro durante processamento.";
            next();
        })

    // Account.findById(fromAccount)
    //     .then(account => {
    //         if (!account) {
    //             this.status = "abortado";
    //             this.msg = "Conta não localizada.";
    //             next();
    //         } else if (account.balance < transactionValue) {
    //             this.status = "abortado";
    //             this.msg = "Saldo insuficiente.";
    //             next();
    //         } else {
    //             console.log(account.balance);
    //             this.status = "processando";
    //             account.balance -= transactionValue;
    //             account.save().then(() => next());
    //         }
    //     })
    //     .catch(e => {
    //         this.msg = "Erro durante processamento.";
    //         next();
    //     })
}

// function afterSave(doc, next) {
//     const Account = model.model("Account");
//     if (this.status != "processando") return next();
//     const toAccount = this.to;
//     const transactionValue = this.value;
//     Account.findById(toAccount)
//         .then(account => {
//             account.balance += transactionValue;
//             return account.save();
//         })
//         .then(() => model.updateOne({ _id: this._id }, { status: "completado" }))
//         .then(() => next())
//         .catch(e => {
//             model.updateOne({ _id: this._id }, { status: "abortado", msg: "Erro durante o processamento." })
//                 .then(() => next());
//         })
// }

schema.pre('save', beforeSave);
// .post('save', afterSave);

module.exports = model;