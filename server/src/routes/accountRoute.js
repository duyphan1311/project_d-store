const express = require('express');
const router = express.Router();
const { accountController } = require('../controllers');
const tokenHandler = require('../handlers/tokenHandler');

router.post('/login', accountController.login);
router.post('/register', accountController.register)

router.post(
    '/check-token',
    tokenHandler.verifyToken,
    (req, res) => {
        res.status(200).json('Authorized');
    }
)

module.exports = router;