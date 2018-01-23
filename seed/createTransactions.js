const db = require("../db");
const maxTransactionsPerAccount = 50;
const maxTransactionValue = 15000;
const Account = db.Account;
const Transaction = db.Transaction;
const transactions = [];


const howManyTransactions = () => Math.floor(Math.random() * maxTransactionsPerAccount) + 1;
const transactionValue = () => {
    //https://stackoverflow.com/questions/13455042/random-number-between-negative-and-positive-value
    let value = Math.floor(Math.random() * maxTransactionValue) + 1; // this will get a number between 1 and 99;
    value *= Math.floor(Math.random() * 2) == 1 ? 1 : -1; // this will add minus sign in 50% of cases
    return value;
}

//TODO: init saldo, primeira transação será sempre uma transação de credito de origem conta do sistema.
//TODO: split howManyTransactions into two: debit and credit

const createNewTransaction = account => {
    accountNumber++;
    //TODO: conta de destino nao pode ser do mesmo cliente?
    return { account: account._id, ag: 1, account_number: accountNumber, password: "password" };
}

const removeAllTransactions = async () => {
    try {
        await Transaction.remove();
    } catch (e) {
        console.log(e)
    } finally {
        console.log(`all transactions removed!`);
    }
}

const insertTransactions = async () => {
    let res;
    //TODO: testar triggers no insterMany
    //TODO: trigger só é chamado via create?
    try {
        res = await db.Transaction.create(transactions);
    } catch (e) {
        console.log(e)
    } finally {
        console.log(`${res.length} accounts created`);
    }
}

const onAccountRecived = account => {
    let transactionQtd = howManyTransactions();
    for (; transactionQtd > 0; transactionQtd--)
        accounts.push(createNewAccount(account._id, ))
    console.log("account: ", accounts.length)
}

const main = async () => {
    await removeAllTransactions();
    const stream = Account.find({}).stream();
    stream.on('data', onAccountRecived);
    stream.on('end', () => insertTransactions())
}

main();



