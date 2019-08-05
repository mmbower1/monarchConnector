const express = require('express');
const router = express.Router();
// const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator/check');
const User = require('../../models/User');
const transaction = require('../../web3.js');
const keys = require('../../config/keys');

// @route     POST api/users
// @desc      Register user
// @access    Public
router.post(
    '/',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('wallet', 'Address must include atleast 40 characters').isLength({ min: 40 }),
        // check('participation', 'Please choose participation type').exists(),
        check('checkbox', 'Please agree to Monarch user terms').exists()
    ], async (req, res) => {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, wallet, checkbox, subscription } = req.body;

        console.log("Incoming Body Data: " + JSON.stringify(req.body, null, 2));
        console.log("subscription: " + subscription);

        try {
            // see if user exists. anything with await in front returns a promise 
            // let user = await User.findOne({email: email, wallet: wallet, transaction: false}, function(err, obj) {});
            let user = await User.findOne({email: { $regex: new RegExp("^" + email.toLowerCase(), "i") }, wallet: wallet}, function(err, obj) {
                if(err) throw err;
                console.log("Found user in the database!: " + obj);
            });
            console.log("user after User.findOne: " + user);
            let numberOfUsers = 0;

            // let doubleUsers = await User.find({email: email, wallet: wallet}, 
            //     function(err, docs) {
            //         numberOfUsers = docs.length;
            // });
            
            // user can only have 1 success trial
            if(numberOfUsers){
                console.log("----------------- numberOfUsers TRUE ------------------");
                console.log(numberOfUsers);
                
            }
            if(numberOfUsers <= 1){
                console.log("----------------- numberOfUsers <= 1 ------------------");
                console.log(numberOfUsers <= 1);   
            }
            if (user && numberOfUsers <= 1) {
                console.log("user && numberOfUsers <= 1 " + (user && numberOfUsers <= 1));
                // new User gets sent to mongo to show double user trials
                // let user_new_schema = new User({email: email, wallet: wallet, checkbox: checkbox});
                // console.log("----------------- user_new_schema ------------------");
                // console.log(user_new_schema);

                // Valid User, Update User
                if (!user.transaction){
                    console.log("user.transaction: " + user.transaction)
                    console.log("Valid user, now updating in users.js...");
                    var query = {email: email, wallet: wallet};
                    console.log(" ");
                    console.log(" ");
                    console.log(" ");
                    console.log(" =========================================================================== ");
                    console.log("query: " + JSON.stringify(query));
                    // await User.updateOne(query, {transaction: true, subscribed: subscription}, {unique: true, upsert:true}, 
                        await User.updateOne(query, {transaction: true, subscribed: subscription},  
                        function(err, doc){
                            if (err) return res.send(500, { error: err });
                            console.log("User.updateOne callback");
                            // trigger transaction from web3.js
                            transaction(wallet, user.get("balance"), user);
                            console.log("Called on transaction in web3");
                            console.log("User updated in users.js");
                            console.log("Sending back response now...");
                            res.json({ user, success: true, transaction: user.transaction});
                    });
                } else {
                    console.log("------------ user already conducted transaction --------------");
                    res.json({ success: false, transaction: user.transaction });
                }
            } else {
                console.log("----------------- Invalid User CANNOT Add ------------------");
                res.json({ success: false, transaction: user.transaction});
            }
    } catch(err) {
        console.error(err);
        res.json({ success: false });
    }
})

// router.get('/', async (req, res) => {
//     try {
//         User.find({ "email": {$regex: /jr@splash/i} }).then(function(userInfo) {
//             res.send(userInfo);
//         })
//     } catch(err) {
//         res.status(500).send('Server error(users2)');
//     }
// })

module.exports = router;