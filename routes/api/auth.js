const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator/check');
const secret = 'mysecrettoken';

// @route   POST api/auth
// @desc    Authenticate user and get token
// @access  Public
router.post(
    '/', 
    [
        check('email', 'Please include a valid email').isEmail(),
        check('erc20address', 'Address must include atleast 40 characters').isLength({ min: 6 }),

    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json( {errors: errors.array() });
        }

        const { email, wallet, participation, checkbox } = req.body;
        try {
            // see if user exists
            let user = await User.findOne({ email });
            
            if (!user) {
                res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
            }

            const isMatch = await bcrypt.compare(wallet, user.wallet);

            if (!isMatch) {
                return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
            }

            // return jsonwebtoken
            const payload = {
                user: {
                    id: user.id
                }
            }
            jwt.sign(payload, 
                secret, 
                { expiresIn: '365d' }, 
                (err, token) => {
                    if(err) throw err;
                    res.json({ token });
                });

        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server error(auth)');
        }
});

// @route     GET api/auth
// @desc      Test Route
// @access    Public
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error(auth)');
    }
});


module.exports = router;