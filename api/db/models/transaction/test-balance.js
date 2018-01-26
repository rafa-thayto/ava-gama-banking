
const db = require("../../");
db.Transaction.create({ to: "5a67743c4f9ef576c909c6c6", from: "5a67743c4f9ef576c909c6c5", value: 59951 }).then(a => console.log(a)).catch(err => console.log(err));