const express = require('express')
const auth = require("../config/auth")
const router = express.Router()
const db = require('../../db');
const Account = db.Account;
const Transaction = db.Transaction;
/**
 * @api {get} /transactions/:transactionId Obter informações de uma transação
 * @apiName TransactionGet
 * @apiGroup Transaction
 *
 * @apiHeader {String} authorization JWT \<token\>
 * @apiParam {String} transactionId id da transacao
 * @apiSuccess {Object} from dados da origem da transação
 * @apiSuccess {Number} from.ag agencia de origem
 * @apiSuccess {Number} from.account_number conta de origem
 * @apiSuccess {Number} from.client_name nome do cliente de origem
 * @apiSuccess {Object} to dados do destino da transação
 * @apiSuccess {Number} to.ag agencia de destino
 * @apiSuccess {Number} to.account_number conta de destino
 * @apiSuccess {Number} to.client_name nome do cliente de destino
 * @apiSuccess {Number} value valor da transação
 * @apiSuccess {Date} date data da transação
 * @apiSuccess {String} status status da transação
 * @apiSuccess {ObjectId} _id id da transação
 * @apiError TransactionNotFound Transação não localizada
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

//TODO: validar senha
const checkPassword = async (req, res, next) => {
    const isValidPassword = true;
    if (!isValidPassword) return res.status(403).end();
    next();
}
const getDestinyAccount = async (req, res, next) => {
    const toAccount = { ag: req.body.ag, account_number: req.body.account_number };
    if (!toAccount) return res.status(400).end();
    if (!toAccount.ag) return res.status(400).end();
    if (!toAccount.account_number) return res.status(400).end();
    const account = await Account.findOne(toAccount).lean();
    if (!account) return res.status(404).end();
    req.toAccountId = account._id;
    next();
}
const createTransaction = async (req, res, next) => {
    const fromAccountId = req.account._id;
    const toAccountId = req.toAccountId;
    const newTransaction = { value: req.body.value, to: toAccountId, from: fromAccountId };
    const transaction = new Transaction(newTransaction);
    const isInvalidTransaction = transaction.validateSync();
    if (isInvalidTransaction) return res.status(400).end();
    try {
        await transaction.save();
        //TODO: retornar obj com transação criada conforme docs
        res.status(200).json(transaction);
    } catch (e) {
        res.status(500)
        res.send(`${e}`)
    } finally {
        res.end()
    }
}
/**
 * @api {post} /transactions/ Criar uma nova transação
 * @apiName TransactionPost
 * @apiGroup Transaction
 *
 *
 * @apiHeader {String} authorization JWT \<token\>
 *
 * @apiParam {Number} ag agencia de destino
 * @apiParam {Number} account_number conta de destino
 * @apiParam {String} value valor da transacao
 * @apiParam {String} password senha de confirmação
 *
 * @apiSuccess {Object} from dados da origem da transação
 * @apiSuccess {Number} from.ag agencia de origem
 * @apiSuccess {Number} from.account_number conta de origem
 * @apiSuccess {Number} from.client_name nome do cliente de origem
 * @apiSuccess {Object} to dados do destino da transação
 * @apiSuccess {Number} to.ag agencia de destino
 * @apiSuccess {Number} to.account_number conta de destino
 * @apiSuccess {Number} to.client_name nome do cliente de destino
 * @apiSuccess {Number} value valor da transação
 *
 * @apiError AccountNotFound conta não localizada
 * @apiError TransactionBadRequest parametros invalidos
 * @apiError TransactionNotAuthorized senha invalida
 */
router.post('/', auth.isAuthenticated, auth.isAuthorized, checkPassword, getDestinyAccount, createTransaction);

module.exports = router
