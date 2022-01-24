const express = require('express')
const router = express.Router()
const { roleController } = require('../controllers')
const tokenHandler = require('../handlers/tokenHandler')

router.post('/',
    tokenHandler.verifyAdminToken,
    roleController.create
)
router.put('/:id',
    tokenHandler.verifyAdminToken,
    roleController.update
)
router.delete('/:id',
    tokenHandler.verifyAdminToken,
    roleController.delete
)
router.get('/',
    tokenHandler.verifyAdminToken,
    roleController.getAll
)
router.get('/:id',
    tokenHandler.verifyAdminToken,
    roleController.getOne
)

module.exports = router