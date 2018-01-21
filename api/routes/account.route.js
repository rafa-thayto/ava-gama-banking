const express = require('express');
const auth = require("../auth");
const router = express.Router();

//TODO: hide and unhide ID
router.get(
    '/:accountId',
    auth.isAuthenticated,
    auth.isAuthorized,
    (req, res, next) => {
        res.send('get account info');
    }
);

router.post(
    '/',
    auth.isAuthenticated,
    auth.isAuthorized,
    (req, res, next) => {
        res.send('create new account');
    }
);

module.exports = router;