const express = require('express');
const auth = require('../auth');
const router = express.Router();
const db = require("../../db");
const SECRET = "TODO:CRIAR_UMA_SECRET";
const JWT_OPTIONS = { expiresIn: '1h' };

const invalidRequest = (req, res, next) => {
    res.status(400)
        .json({ message: 'invalid parameters.' });
    res.end();
}

const credentialNotFound = (req, res, next) => {
    res.status(404)
        .json({ message: 'user not found.' });
    res.end();
}
const passwordMissmatch = (req, res, next) => {
    res.status(401)
        .json({ message: 'wrong password.' });
    res.end();
}
const passwordMatch = (req, res, next, account) => {
    const payload = account;
    const token = auth.createToken(payload);
    res.json({ token: token });
    next();
}

router.post('/login', async (req, res, next) => {
    if (!req.body) req.body = {};
    const account_number = req.body.account_number;
    const ag = req.body.ag;
    const password = req.body.password;
    if (typeof account_number !== "number") return invalidRequest(req, res, next);
    if (typeof ag !== "number") return invalidRequest(req, res, next);
    if (typeof password !== "string") return invalidRequest(req, res, next);

    try {
        const account = await db.Account.findOne({ ag: ag, account_number: account_number });
        if (!account) return credentialNotFound(req, res, next);
        //caso as senhas estejam iguais
        if (auth.isSamePassword(password, account.password)) passwordMatch(req, res, next, account.toObject());
        else passwordMissmatch(req, res, next);
    } catch (e) {
        console.log(e);
        res.status(500);
    } finally {
        res.end();
    }
});

router.get('/isTokenValid',
    auth.isAuthenticated,
    (req, res, next) => res.status(200).end()
);

module.exports = router;
