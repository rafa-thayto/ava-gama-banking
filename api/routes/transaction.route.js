const express = require('express')
const auth = require("../config/auth")
const router = express.Router()
const db = require('../../db')

router.get(
    '/:transactionId',
    auth.isAuthenticated,
    auth.isAuthorized,
    async (req, res, next) => {
        try {
            const transaction = await db.Transaction
                                        .findById(req.params.transactionId)
                                        .populate('from to')
            if (!transaction) return res.status(404)
            res.json(transaction)
        } catch (e) {
            res.status(500)
            res.send(`${e}`)
        } finally {
            res.end()
        }
    }
);

module.exports = router
