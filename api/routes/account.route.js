const express = require('express');
const auth = require("../auth");
const router = express.Router();
const db = require('../../db')


router.get(
    '/:ag/:conta',
    auth.isAuthenticated,
    auth.isAuthorized,
    async (req, res, next) => {
        try {
            const account = await db.Account.findOne({ag: req.params.ag, account_number: req.params.conta}).populate('client')
            if (!account) return res.status(404)
            res.json(account.toJSON())
            res.send('get account info')
            res.end()
        } catch (e) {
            res.status(500);
            console.log(e);
        } finally {
            res.end();
        }
    }
);

// http://localhost:3000/accounts/1/10/transactions
router
    .route('/:ag/:conta/transactions')
    .get(
        auth.isAuthenticated,
        auth.isAuthorized,
        (req, res, next) => {

            db.Transaction.find({value: 3089}, function(err, docs){
                if (!docs) return res.status(404)               
                res.json(docs)
                res.end();
            })
            
        }
    )
    .post(
        auth.isAuthenticated,
        auth.isAuthorized,
        (req, res, next) => {
            console.log('criando nova transição')

            var transaction = req.body
            console.log(transaction)

            db.Transaction.create(transaction, function(err, docs) {
                /*
                if (err) throw err;
                    console.log('INSERIU COM SUCESSO')
                    res.status(201).json(transaction)  
                */
                res.end();
            })

        }
    );

module.exports = router;
