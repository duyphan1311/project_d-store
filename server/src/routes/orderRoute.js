const express = require('express')
const router = express.Router()
const tokenHandler = require('../handlers/tokenHandler')
const { orderController } = require('../controllers')

router.post('/',
    tokenHandler.verifyEmployeeToken,
    orderController.create
)
router.put('/:id',
    tokenHandler.verifyEmployeeToken,
    orderController.update
)
router.delete('/:id',
    tokenHandler.verifyEmployeeToken,
    orderController.delete
)
router.get('/',
    tokenHandler.verifyEmployeeToken,
    orderController.getAll
)
router.get('/:id',
    tokenHandler.verifyEmployeeToken,
    orderController.getOne
)

module.exports = router