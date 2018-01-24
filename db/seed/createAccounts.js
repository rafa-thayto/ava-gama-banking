const db = require("../");
const auth = require("../../api/auth");
const maxAccountsPerClient = 5;
const Client = db.Client;
const Account = db.Account;
let accountNumber = 0;
const accounts = [];

const howManyAccounts = () => Math.floor(Math.random() * maxAccountsPerClient) + 1;

//https://gist.github.com/endel/321925f6cafa25bbfbde
Number.prototype.pad = function(size) {
    var s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
}

const createNewAccount = clientId => {
    accountNumber++;
    const password = auth.strToHash(accountNumber.pad(6));
    //TODO: gerar password com base no numero da conta
    return { client: clientId, ag: 1, account_number: accountNumber, password: password };
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



