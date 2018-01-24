const express = require('express');
const auth = require("../auth");
const router = express.Router()
const db = require('../../db')


router.get(
    '/:ag/:conta',
    auth.isAuthenticated,
    auth.isAuthorized,
    async (req, res, next) => {
        try {
            const account = await db.Account
                                    .findOne({ag: req.params.ag, account_number: req.params.conta})
                                    .populate('client')
            if (!account) return res.status(404)
            res.json(account)
        } catch (e) {
            res.status(500);
            res.send(`${e}`)
        } finally {
            res.end()
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
            console.log('passou')
            
            const agencia = req.params.ag
            const conta = req.params.conta

            db.Account.findTransactionsByAccount(agencia, conta).then(function(accounts){
                if (!accounts) return res.status(404)   
                console.log('passou pelo call')            
                res.status(200).json(accounts)
                res.end();
            })
            console.log('depois do find')  
        }
    )
    .post(
        auth.isAuthenticated,
        auth.isAuthorized,
        (req, res, next) => {

            res.send('create new transaction')

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

// 92ea10d69e70618e58331464dab421ffbf6351c1
        }
    );

module.exports = router;
