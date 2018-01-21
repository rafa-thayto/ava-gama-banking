const express = require('express');
const auth = require("../auth");
const router = express.Router();
//TODO: hide and unhide ID
router.get(
    '/:clientId',
    auth.isAuthenticated,
    auth.isAuthorized,
    (req, res, next) => {
        res.send('get client info');
    }
);

router.post(
    '/',
    auth.isAuthenticated,
    auth.isAuthorized,
    (req, res, next) => {
        res.send('create new client');
    }
);

module.exports = router;