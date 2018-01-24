const express = require('express');
const auth = require("../auth");
const router = express.Router()
const db = require('../../db')
const Account = db.Account


router.get(
    '/:ag/:conta',
    // auth.isAuthenticated,
    // auth.isAuthorized,
    async (req, res, next) => {
        try {
            const agencia = req.params.ag
            const conta = req.params.conta
            const account = await Account
                                    .findOne({ag: agencia, account_number: conta})
                                    .populate('client')
            if (!account) return res.status(404)
            res.status(200).json(account)
        } catch (e) {
            console.log(e)
            res.status(500);
        } finally {
            res.end()
        }
    }
);

// http://localhost:3000/accounts/1/10/transactions
router
    .route('/:ag/:conta/transactions')
    .get(
        // auth.isAuthenticated,
        // auth.isAuthorized,
        async (req, res, next) => {
            try {
                const agencia = req.params.ag
                const conta = req.params.conta
                const transactions = await Account
                                        .findTransactionsByAccount(agencia, conta)
                if (!transactions) return res.status(404)   
                res.status(200).json(transactions)
            } catch (e) {
                console.log(e);
                res.status(500)
            } finally {
                res.end()
            }
            
        }
    )
    .post(
        // auth.isAuthenticated,
        // auth.isAuthorized,
        (req, res, next) => {

            res.send('create new transaction')

            console.log('criando nova transição')

            var transaction = req.body
            console.log(transaction)

            db.Transaction.create(transaction, function(err, docs) {
                
                /* if (err) throw err;
                    console.log('INSERIU COM SUCESSO')
                    res.status(201).json(transaction)   */
                
                res.end();
            })

        }
    );

module.exports = router;
