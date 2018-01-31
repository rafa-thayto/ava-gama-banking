const db = require("../");
const maxClients = 100;
const auth = require("../../config/auth");
const names = ["pedro", "bruno", "rafael", "anselmo", "geovana", "jennfer", "marcos", "paulo", "ricardo"];
const Client = db.Client;

//https://gist.github.com/endel/321925f6cafa25bbfbde
Number.prototype.pad = function(size) {
    var s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
}

const getCurrentName = index => `${names[index % names.length]} de ${index}`;

const createNewClient = index => {
    console.log(index)
    const password = auth.strToHash(index.pad(6));
    return { name: getCurrentName(index), document: index, password };
}

const removeAllClients = async () => {
    try {
        await Client.remove();;
    } catch (e) {
        console.log(e)
    } finally {
        console.log(`all clients removed!`);
    }

}

const insertClients = async clients => {
    let res;
    try {
        res = await db.Client.insertMany(clients);
    } catch (e) {
        console.log(e)
    } finally {
        console.log(`${res.length} clients created`);
    }
}

const main = () => {
    const clients = [];
    for (let i = 0; i < maxClients; i++)
        clients.push(createNewClient(i));
    removeAllClients();
    insertClients(clients);
}

main();



