const express = require('express');
const auth = require("../auth");
const router = express.Router();

router.get(
    '/:trasactionId',
    auth.isAuthenticated,
    auth.isAuthorized,
    (req, res, next) => {
        res.send('get transaction info');
    }
);

module.exports = router;