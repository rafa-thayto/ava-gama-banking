// const server = require('./config/server');
// require('./config/routes')(server);
const bodyParser = require('body-parser');
const express = require('express');
const port = 3000;
const app = express();

const AuthRouter = require("./routes/auth.route");
const ClientRouter = require("./routes/client.route");
const TransactionRouter = require("./routes/transaction.route");
const AccountRouter = require("./routes/account.route");

app.use('/auth', AuthRouter);
app.use('/clients', ClientRouter);
app.use('/transactions', TransactionRouter);
app.use('/accounts', AccountRouter);

app.listen(port, () => console.log(`API is running on port: ${port}`));