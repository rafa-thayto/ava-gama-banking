const express = require('express');
const auth = require("../auth");
const router = express.Router();

//TODO: hide and unhide ID
router.get(
    '/:trasactionId',
    auth.isAuthenticated,
    auth.isAuthorized,
    (req, res, next) => {
        res.send('get transaction info');
    }
);

router.post(
    '/',
    auth.isAuthenticated,
    auth.isAuthorized,
    (req, res, next) => {
        // quantia? de alguem? para alguem? quando?
        // add um pre insert no model para verificar existencia de saldo
        // caso nao haja saldo thrown error
        // add um post insert no model para atualizar o saldo de ambos os clientes
        res.send('create new transaction');
    }
);

module.exports = router;