const db = require("../db");
const maxAccountsPerClient = 5;
const Client = db.Client;
const Account = db.Account;
let accountNumber = 0;
const accounts = [];

const howManyAccounts = () => Math.floor(Math.random() * maxAccountsPerClient) + 1;

const createNewAccount = clientId => {
    accountNumber++;
    //TODO: gerar password com base no numero da conta
    return { client: clientId, ag: 1, account_number: accountNumber, password: "password" };
}

const removeAllAccounts = async () => {
    try {
        await Account.remove();
    } catch (e) {
        console.log(e)
    } finally {
        console.log(`all accounts removed!`);
    }
}

const insertAccounts = async () => {
    let res;
    try {
        res = await db.Account.insertMany(accounts);
    } catch (e) {
        console.log(e)
    } finally {
        console.log(`${res.length} accounts created`);
    }
}

const onClientRecived = client => {
    let clientAccountQtd = howManyAccounts();
    for (; clientAccountQtd > 0; clientAccountQtd--)
        accounts.push(createNewAccount(client._id, ))
    console.log("account: ", accounts.length)
}

const main = async () => {
    await removeAllAccounts();
    const stream = Client.find({}).stream();
    stream.on('data', onClientRecived);
    stream.on('end', () => insertAccounts())
}

main();



