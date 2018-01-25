const express = require('express')
const auth = require("../config/auth")
const router = express.Router()
const db = require('../../db')
/**
 * @api {get} /transactions/:transactionId Obter informações de uma transação
 * @apiName TransactionGet
 * @apiGroup Transaction
 *
 * @apiHeader {String} authorization JWT \<token\>
 * @apiSuccess {IAccount} account obj.
 */
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

/**
 * @api {post} /transactions/ Criar uma nova transação
 * @apiName TransactionPost
 * @apiGroup Transaction
 *
 *
 * @apiSuccess {IAccount} account obj.
 */

module.exports = router
