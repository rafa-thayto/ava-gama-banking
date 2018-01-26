const express = require('express');
const auth = require("../config/auth");
const router = express.Router()
const db = require('../db')
const Account = db.Account
const Client = db.Client;

/**
 * @api {get} /clients/ Obter informacoes de um cliente pela conta
 * @apiName GetClient
 * @apiGroup Client
 *
 * @apiParam {Number} ag numero da agencia
 * @apiParam {Number} account_number numero da conta
 * @apiHeader {String} authorization JWT \<token\>
 * @apiSuccess {String} name Nome do cliente
 * @apiError AccountNotFound Conta não localizada
 * @apiError ClientNotFound Cliente não localizado
 * @apiError BadRequest Ausencia de parametros validos
 */
router.get('/',
    // auth.isAuthenticated,
    // auth.isAuthorized,
    async (req, res, next) => {
        const ag = req.query.ag;
        const account_number = req.query.account_number;
        if (!ag || !account_number) return res.status(400).end();
        try {
            const account = await Account.findOne({ag, account_number}).lean();
            if(!account) return res.status(404);
            const client = await Client.findById(account.client).select("name -_id").lean();
            if (!client) return res.status(404);
            res.status(200).json(client);
        } catch (e) {
            res.status(500);
        } finally {
            next();
        }
    }
);

module.exports = router;
