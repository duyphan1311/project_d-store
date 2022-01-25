const express = require('express')
const router = express.Router()
const tokenHandler = require('../handlers/tokenHandler')
const { orderController } = require('../controllers')

router.post('/',
    tokenHandler.verifyToken,
    orderController.create
)
router.put('/:id',
    tokenHandler.verifyToken,
    orderController.update
)
router.delete('/:id',
    tokenHandler.verifyToken,
    orderController.delete
)
router.get('/',
    tokenHandler.verifyEmployeeToken,
    orderController.getAll
)
router.get('/:id',
    tokenHandler.verifyToken,
    orderController.getOne
)

module.exports = router