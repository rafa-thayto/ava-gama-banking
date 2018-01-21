const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = "TODO:CRIAR_UMA_SECRET";
const JWT_OPTIONS = { expiresIn: '1h' };

//TODO: jwt.verify
module.exports.isAuthenticated = (req,res,next) => next();
module.exports.isAuthorized = (req,res,next) => next();
module.exports.isSamePassword = (password, hash) => bcrypt.compareSync(password, hash);
module.exports.createToken = payload => jwt.sign(payload, SECRET, JWT_OPTIONS);