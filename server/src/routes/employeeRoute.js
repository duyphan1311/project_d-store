const express = require('express');
const router = express.Router();
const { employeeController } = require('../controllers');
const tokenHandler = require('../handlers/tokenHandler');

router.post('/',
    tokenHandler.verifyAdminToken,
    employeeController.create
)

router.post(
    '/check-token',
    tokenHandler.verifyEmployeeToken,
    (req, res) => {
        res.status(200).json('Authorized');
    }
)

module.exports = router;