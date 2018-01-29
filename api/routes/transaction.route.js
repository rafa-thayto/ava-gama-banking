const express = require('express')
const auth = require("../config/auth")
const router = express.Router()
const db = require('../db');
const Account = db.Account;
const Transaction = db.Transaction;
const populateClientOpt = { path: 'client', select: 'name' };
const populateFromOpt = { path: 'from', select: 'ag account_number', populate: populateClientOpt };
const populateToOpt = { path: 'to', select: 'ag account_number', populate: populateClientOpt };
/**
 * @api {get} /transactions/ Obter lista de transações
 * @apiName TransactionsGet
 * @apiGroup Transaction
 *
 * @apiHeader {String} authorization JWT \<token\>
 * @apiParam {Date} dateStart data de inicio
 * @apiParam {Date} dateEnd data de fim
 * @apiParam {Number} valueStart valor da transacao (inicio)
 * @apiParam {Number} valueEnd valor da transacao (fim)
 * @apiParam {Number} ag numero da agencia
 * @apiParam {Number} account_number numero da conta
 * @apiParam {Number} limit limite de registros
 * @apiParam {Number} skip registros para pular
 *
 * @apiSuccess {Object[]} transactions transacoes localizadas
 * @apiSuccess {Object} transactions.from dados da origem da transação
 * @apiSuccess {Number} transactions.from.ag agencia de origem
 * @apiSuccess {Number} transactions.from.account_number conta de origem
 * @apiSuccess {Object} transactions.from.client cliente de origem
 * @apiSuccess {String} transactions.from.client.name nome do cliente de origem
 * @apiSuccess {Object} transactions.to dados do destino da transação
 * @apiSuccess {Number} transactions.to.ag agencia de destino
 * @apiSuccess {Number} transactions.to.account_number conta de destino
 * @apiSuccess {Object} transactions.to.client cliente de destino
 * @apiSuccess {String} transactions.to.client.name nome do cliente de destino
 * @apiSuccess {Number} transactions.value valor da transação
 * @apiSuccess {Date} transactions.date data da transação
 * @apiSuccess {String} transactions.status status da transação
 * @apiSuccess {ObjectId} transactions._id id da transação
 * @apiError TransactionBadRequest Parametros invalidos
 */
const getAccount = async (req, res, next) => {
    const ag = req.query.ag;
    const account_number = req.query.account_number;
    if (!ag) return res.status(400).end();
    if (!account_number) return res.status(400).end();
    const account = await db.Account.findOne({ ag, account_number }).lean();
    if (!account) return res.status(404).end();
    if (account.client.toString() !== req.clientId.toString()) return res.status(403).end();
    req.accountId = account._id;
    next();
}
const buildQuery = (req, res, next) => {
    let query = db.Transaction.find({ $or: [{ from: req.accountId }, { to: req.accountId }] });
    if (req.query.dateStart) query = query.where('date').gt(req.query.dateStart);
    if (req.query.dateEnd) query = query.where('date').lt(req.query.dateEnd);
    if (req.query.valueStart) query = query.where('value').gt(req.query.valueStart);
    if (req.query.valueEnd) query = query.where('value').gt(req.query.valueEnd);
    if (req.query.limit) query = query.limit(parseInt(req.query.limit));
    if (req.query.skip) query = query.skip(parseInt(req.query.skip));
    query = query.sort({ date: -1 }).populate(populateFromOpt).populate(populateToOpt).select('-createdAt -updatedAt');
    req.mongoQuery = query;
    next();
}
const runQuery = async (req, res, next) => {
    try {
        let transactions = await req.mongoQuery.lean();
        if (!transactions || transactions.length === 0) return res.status(404).end();
        db.Log.info('transaction.read', req.token, req.sourceIp, transactions);
        transaction = transactions.map(transaction => {
            transaction.isCredit = transaction.to._id.toString() === req.accountId.toString();
            return transaction;
        })
        res.json(transactions).end();
    } catch (e) {
        res.status(500).end()
    }
    next();
}

router.get('/', auth.isAuthenticated, getAccount, buildQuery, runQuery);
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
 * @apiSuccess {Object} from.client cliente de origem
 * @apiSuccess {String} from.client.name nome do cliente de origem
 * @apiSuccess {Object} to dados do destino da transação
 * @apiSuccess {Number} to.ag agencia de destino
 * @apiSuccess {Number} to.account_number conta de destino
 * @apiSuccess {Object} to.client cliente de destino
 * @apiSuccess {String} to.client.name nome do cliente de destino
 * @apiSuccess {Number} value valor da transação
 * @apiSuccess {Date} date data da transação
 * @apiSuccess {String} status status da transação
 * @apiSuccess {ObjectId} _id id da transação
 * @apiError TransactionNotFound Transação não localizada
 */
const getTransactions = async (req, res, next) => {
    try {
        const transaction = await db.Transaction
            .findById(req.params.transactionId)
            .populate(populateFromOpt)
            .populate(populateToOpt)
            .select('-createdAt -updatedAt')
            .lean();
        if (!transaction) return res.status(404).end();
        req.transaction = transaction;
        next();
    } catch (e) {
        res.status(500).end();
    }
}
const checkTransactionClients = (req, res, next) => {
    const transaction = req.transaction;
    const clientId = req.clientId.toString();
    const ids = [transaction.from.client._id.toString(), transaction.to.client._id.toString()];
    if (ids.indexOf(clientId) === -1) {
        db.Log.warn('transaction.read', req.token, req.sourceIp, req.params.transactionId);
        return res.status(403).end();
    }
    res.json(transaction).end();
}
router.get('/:transactionId', auth.isAuthenticated, getTransactions, checkTransactionClients);
/**
 * @api {post} /transactions/ Criar uma nova transação
 * @apiName TransactionPost
 * @apiGroup Transaction
 *
 *
 * @apiHeader {String} authorization JWT \<token\>
 *
 * @apiParam {Object} from dados da origem da transação
 * @apiParam {Number} from.ag agencia de origem
 * @apiParam {Number} from.account_number conta de origem
 * @apiParam {Object} to dados do destino da transação
 * @apiParam {Number} to.ag agencia de destino
 * @apiParam {Number} to.account_number conta de destino
 * @apiParam {String} value valor da transacao
 * @apiParam {String} password senha de confirmação (senha da conta)
 *
 * @apiSuccess {Object} from dados da origem da transação
 * @apiSuccess {Number} from.ag agencia de origem
 * @apiSuccess {Number} from.account_number conta de origem
 * @apiSuccess {Object} from.client cliente de origem
 * @apiSuccess {String} from.client.name nome do cliente de origem
 * @apiSuccess {Object} to dados do destino da transação
 * @apiSuccess {Number} to.ag agencia de destino
 * @apiSuccess {Number} to.account_number conta de destino
 * @apiSuccess {Object} to.client cliente de destino
 * @apiSuccess {String} to.client.name nome do cliente de destino
 * @apiSuccess {Number} value valor da transação
 *
 * @apiError AccountNotFound conta não localizada
 * @apiError TransactionBadRequest parametros invalidos
 * @apiError TransactionNotAuthorized senha invalida
 */
const checkPassword = async (req, res, next) => {
    const isValidPassword = true;
    const password = req.body.password;
    if (!password) return res.status(400).end();
    const fromAccount = req.fromAccount;
    if (!auth.isSamePassword(req.body.password, fromAccount.password)) return res.status(403).end();
    next();
}
const getSourceAccount = async (req, res, next) => {
    const fromAccount = req.body.from;
    if (!fromAccount) return res.status(400).end();
    if (!fromAccount.ag) return res.status(400).end();
    if (!fromAccount.account_number) return res.status(400).end();
    const account = await Account.findOne({ ag: fromAccount.ag, account_number: fromAccount.account_number }).lean();
    if (!account) return res.status(404).end();
    if (account.client.toString() !== req.clientId.toString()) return res.status(403).end();
    req.fromAccountId = account._id;
    req.fromAccount = account;
    next();
}
const getDestinyAccount = async (req, res, next) => {
    console.log("AAAAAAAAAAAA");
    const toAccount = req.body.to;
    if (!toAccount) return res.status(400).end();
    if (!toAccount.ag) return res.status(400).end();
    if (!toAccount.account_number) return res.status(400).end();
    const account = await Account.findOne({ ag: toAccount.ag, account_number: toAccount.account_number }).lean();
    if (!account) return res.status(404).end();
    req.toAccountId = account._id;
    if (req.fromAccountId === req.toAccountId) return res.status(400).end();
    console.log("BBBBBBBBBBBBBB");

    next();
}
const createTransaction = async (req, res, next) => {
    const fromAccountId = req.fromAccountId;
    const toAccountId = req.toAccountId;
    const newTransaction = { value: req.body.value, to: toAccountId, from: fromAccountId };
    const transaction = new Transaction(newTransaction);
    const isInvalidTransaction = transaction.validateSync();
    db.Log.info('transaction.create', req.token, req.sourceIp, newTransaction);
    if (isInvalidTransaction) return res.status(400).end();
    try {
        await transaction.save();
        const response = await db.Transaction
            .findById(transaction._id)
            .populate(populateFromOpt)
            .populate(populateToOpt)
            .select('-createdAt -updatedAt')
            .lean();
        res.status(200).json(response).end();
    } catch (e) {
        db.Log.error('transaction.create', req.token, req.sourceIp, newTransaction);
        res.status(500).end()
    }
}
router.post('/', auth.isAuthenticated, getSourceAccount, checkPassword, getDestinyAccount, createTransaction);

module.exports = router
