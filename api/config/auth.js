const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = "TODO:CRIAR_UMA_SECRET";
const JWT_OPTIONS = { expiresIn: '1h' };
const tokenRegEx = /^JWT (.+)$/;

const isValidAuthHeader = header => tokenRegEx.test(header);
const getTokenFromAuthHeader = header => tokenRegEx.exec(header)[1];
const getTokenPayload = token => jwt.decode(token);

module.exports.isAuthenticated = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(403).end();
    if (!isValidAuthHeader(authHeader)) return res.status(403).end();
    const token = getTokenFromAuthHeader(authHeader);
    try {
        const isTokenValid = jwt.verify(token, SECRET);
        if (!isTokenValid) return res.status(403).end();
    } catch (e) {
        return res.status(403).end();
    }
    req.token = token;
    req.clientId = getTokenPayload(token).id || null;
    if (!req.clientId) return res.status(403).end();
    next();
}

module.exports.isAuthorized = (req, res, next) => next();
module.exports.isSamePassword = (password, hash) => bcrypt.compareSync(password, hash);
module.exports.strToHash = password => bcrypt.hashSync(password, 10);
module.exports.createToken = payload => jwt.sign(payload, SECRET, JWT_OPTIONS);