const bodyParser = require('body-parser');
const express = require('express');
const allowCors = require('./config/cors');
const port = 3000;
const app = express();

const AuthRouter = require("./routes/auth.route");
const TransactionRouter = require("./routes/transaction.route");
const AccountRouter = require("./routes/account.route");

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(allowCors);

app.use('/accounts', AccountRouter);
app.use('/transactions', TransactionRouter);
app.use('/auth', AuthRouter);

app.listen(port, () => console.log(`API is running on port: ${port}`));