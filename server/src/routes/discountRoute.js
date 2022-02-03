const express = require('express')
const router = express.Router()
const tokenHandler = require('../handlers/tokenHandler')
const { discountController } = require('../controllers')

router.post('/',
    tokenHandler.verifyManagerToken,
    discountController.create
)
router.put('/:id',
    tokenHandler.verifyManagerToken,
    discountController.update
)
router.delete('/:id',
    tokenHandler.verifyManagerToken,
    discountController.delete
)
router.get('/',
    tokenHandler.verifyToken,
    discountController.getAll
)
router.get('/:voucher',
    tokenHandler.verifyToken,
    discountController.getOne
)

module.exports = router