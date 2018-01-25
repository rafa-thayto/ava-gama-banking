const db = require("../");
const maxClients = 10000;
const names = ["pedro", "bruno", "rafael", "anselmo", "geovana", "jennfer", "marcos", "paulo", "ricardo"];
const Client = db.Client;

const getCurrentName = index => `${names[index % names.length]} de ${index}`;

const createNewClient = index => {
    return { name: getCurrentName(index), document: index };
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



