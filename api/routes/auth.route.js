const express = require('express');
const auth = require('../config/auth');
const router = express.Router();
const db = require("../db");
const SECRET = "TODO:CRIAR_UMA_SECRET";
const JWT_OPTIONS = { expiresIn: '1h' };

const passwordMissmatch = (req, res, next) => {
    res.status(401)
        .json({ message: 'wrong password.' });
    res.end();
}
const passwordMatch = (req, res, next, client) => {
    console.log(client)
    const payload = { id: client._id || client.id };
    const token = auth.createToken(payload);
    res.json({ token: token });
    next();
}

const findClient = async (req, res, next) => {
    if (!req.body) req.body = {};
    const cpf = req.body.cpf;
    const password = req.body.password;
    if (typeof cpf !== "number") return res.status(400).end();
    if (typeof password !== "string") return res.status(400).end();
    try {
        const client = await db.Client.findOne({ document: cpf }).select('name document password')
        if (!client) return res.status(404).end();
        req.client = client.toObject();
    } catch (e) {
        return res.status(500).end();
    }
    next();
}
const checkPassword = (req, res, next) => {
    const client = req.client;
    const password = req.body.password;
    if (auth.isSamePassword(password, client.password)) passwordMatch(req, res, next, client);
    else passwordMissmatch(req, res, next);
}


/**
 * @api {post} /auth/login Autenticar usuario
 * @apiName AuthLogin
 * @apiGroup Auth
 *
 * @apiParam {Number} cpf               CPF
 * @apiParam {String} password          Senha
 * @apiHeader {String} authorization JWT \<token\>
 * @apiSuccess {Sting} token JWT token.
 */
router.post('/login', findClient, checkPassword);
/**
 * @api {post} /auth/isTokenValid Validar token
 * @apiName AuthToken
 * @apiGroup Auth
*
 * @apiHeader {String} authorization JWT \<token\>
 * @apiSuccess {empty} empty
 */
router.get('/isTokenValid', auth.isAuthenticated, (req, res, next) => res.status(200).end());

module.exports = router;
