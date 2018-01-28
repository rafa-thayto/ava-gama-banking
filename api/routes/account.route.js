const express = require('express');
const auth = require("../config/auth");
const router = express.Router()
const db = require('../db')
const Account = db.Account

/**
 * @api {get} /accounts/ Obter informações da conta
 * @apiName GetAccount
 * @apiGroup Account
 *
 * @apiHeader {String} authorization JWT \<token\>
 * @apiSuccess {IAccount} account obj.
 */
router.get(
    '',
    //TODO: remover parametros
    auth.isAuthenticated,
    auth.isAuthorized,
    async (req, res, next) => {
        try {
            const agencia = req.account.ag
            const conta = req.account.account_number
            const account = await Account.findOne({ag: agencia, account_number: conta}).populate('client');
            if (!account) return res.status(404)
            res.status(200).json(account)
        } catch (e) {
            console.log(e)
            res.status(500);
        } finally {
            res.end()
        }
    }
);

module.exports = router;
