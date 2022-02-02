const express = require('express')
const router = express.Router()
const { customerController } = require('../controllers')
const tokenHandler = require('../handlers/tokenHandler')

router.put('/:id',
    tokenHandler.verifyToken,
    customerController.update
)
router.delete('/:id',
    tokenHandler.verifyAdminToken,
    customerController.delete
)
router.get('/',
    tokenHandler.verifyAdminToken,
    customerController.getAll
)
router.get('/:id',
    tokenHandler.verifyAdminToken,
    customerController.getOne
)

module.exports = router