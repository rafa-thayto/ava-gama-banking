const db = require("../");
const maxTransactionsPerAccount = 500;
const maxTransactionValue = 15000;
const Account = db.Account;
const Transaction = db.Transaction;
const transactions = [];
let mainAccount = {};

let previousAccountId = '';

const howManyTransactions = () => Math.floor(Math.random() * maxTransactionsPerAccount) + 1;
const transactionValue = () => {
    //https://stackoverflow.com/questions/13455042/random-number-between-negative-and-positive-value
    let value = Math.floor(Math.random() * maxTransactionValue) + 1; // this will get a number between 1 and 99;
    // value *= Math.floor(Math.random() * 2) == 1 ? 1 : -1; // this will add minus sign in 50% of cases
    //TODO: nao precisa ser negativo, bastar verificar a origem/destino
    return value;
}

const createNewTransaction = (from, to, value) => ({ from, to, value })

const removeAllTransactions = async () => {
    try {
        await Transaction.remove();
    } catch (e) {
        console.log(e)
    } finally {
        console.log(`all transactions removed!`);
    }
}
const resetAccountBalance = async () => {
    try {
        await Account.updateMany({}, { balance: 25000 })
    } catch (e) {
        console.log(e)
    } finally {
        console.log(`accounts balance's reseted!`);
    }
}

const insertTransactions = async () => {
    //TODO: testar triggers no insterMany
    //TODO: trigger só é chamado via create?
    try {
        const chunkSize = 10000;
        let i = 0, ii = transactions.length, j = ii / chunkSize;
        while (transactions.length > 0) {
            const chunk = transactions.splice(i, chunkSize - 1);
            console.log(`created ${ii - transactions.length}/${ii}`)
            await Transaction.create(chunk);
            delete chunk;
        }
    } catch (e) {
        console.log(e)
    } finally {
        console.log(`task done!`);
    }
}

const createFirstTransaction = account => {
    let value = transactionValue();
    return createNewTransaction(mainAccount, account._id, value); //TODO: get system account
}

const onAccountRecived = account => {
    transactions.push(createFirstTransaction(account));
    let transactionQtd = howManyTransactions();
    for (; transactionQtd > 0; transactionQtd--)
        transactions.push(createNewTransaction(account._id, previousAccountId, transactionValue())); ////TODO: get random account to
    console.log(`transaction: ${transactions.length}`);
    previousAccountId = account._id;
}

const main = async () => {
    mainAccount = await Account.findOne().lean();
    previousAccountId = mainAccount._id;
    await removeAllTransactions();
    await resetAccountBalance();

    const stream = Account.find({}).lean().stream();
    stream.on('data', onAccountRecived);
    stream.on('end', () => console.log("stream end"))
    stream.on('end', insertTransactions)
}

main();