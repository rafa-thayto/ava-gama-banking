const express = require('express');
const auth = require("../auth");
const router = express.Router();
const db = require('../../db')


router.get(
    '/:ag/:conta',
    auth.isAuthenticated,
    auth.isAuthorized,
    async (req, res, next) => {
        try {
            const account = await db.Account.findOne({ag: req.params.ag, account_number: req.params.conta})
            if (!account) return res.status(404);
            res.json(account.toJSON());
            res.send('get account info');
        } catch (e) {
            res.status(500);
            console.log(e);
        } finally {
            res.end();
        }
    }
);

router
    .route('/:ag/:conta/transactions')
    .get(
        auth.isAuthenticated,
        auth.isAuthorized,
        (req, res, next) => {
            res.send('get account transactions');
        }
    )
    .post(
        auth.isAuthenticated,
        auth.isAuthorized,
        (req, res, next) => {
            res.send('create new transaction');
        }
    );

module.exports = router;
