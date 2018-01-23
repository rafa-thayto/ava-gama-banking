const express = require('express');
const auth = require("../auth");
const router = express.Router();

router.get(
    '/:ag/:conta',
    auth.isAuthenticated,
    auth.isAuthorized,
    (req, res, next) => {
        res.send('get account info');
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