const express = require('express');
const auth = require('../auth');
const router = express.Router();
const db = require("../../db");
const SECRET = "TODO:CRIAR_UMA_SECRET";
const JWT_OPTIONS = { expiresIn: '1h' };

const credentialNotFound = (req, res, next) => {
    res.status(404).json({ message: 'user not found.' });
    res.end();
}
const passwordMissmatch = (req, res, next) => {
    res.status(401).json({ message: 'wrong password.' });
    res.end();
}
const passwordMatch = (req, res, next, client) => {
    const payload = { _id: client._id, name: client.name };
    const token = auth.createToken(payload);
    res.json({ token: token });
    next();
}

router.get('/login', (req, res, next) => {
    //TODO: logar pelo CPF/CNPJ ou numero da conta?
    const credential = req.body;
    if (!credential) return credentialNotFound(req, res, next);
    db.Client
        .findOne({ key: credential.key }) //TODO: verificar qual o campo será o key
        .then(client => {
            //caso nao exista o client
            if (!client) return credentialNotFound(req, res, next);
            //caso as senhas estejam iguais
            if (auth.isSamePassword(client.password, credential.password))
                passwordMatch(req, res, next, client);
            else
                passwordMissmatch(req, res, next);
        })
        .catch(err => {
            res.status(500);
            res.end();
        })
});

module.exports = router;