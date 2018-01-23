const express = require('express');
const auth = require("../auth");
const router = express.Router();
const db = require('../../db');

router.get(
    '/:trasactionId',
    auth.isAuthenticated,
    auth.isAuthorized,
    async (req, res, next) => {
        try {
            const transaction = await db.Transaction.findById(req.params.transactionId);
            res.send('get transaction info');
        } catch (e) {
            res.status(500);
        } finally {
            res.end();
        }
    }
);

module.exports = router;
