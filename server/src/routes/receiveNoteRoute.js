const express = require('express')
const router = express.Router()
const { receiveNoteController } = require('../controllers')
const tokenHandler = require('../handlers/tokenHandler')

router.post('/',
    tokenHandler.verifyEmployeeToken,
    receiveNoteController.create
)
router.put('/:id',
    tokenHandler.verifyEmployeeToken,
    receiveNoteController.update
)
router.delete('/:id',
    tokenHandler.verifyEmployeeToken,
    receiveNoteController.delete
)
router.get('/',
    tokenHandler.verifyEmployeeToken,
    receiveNoteController.getAll
)
router.get('/:id',
    tokenHandler.verifyEmployeeToken,
    receiveNoteController.getOne
)

module.exports = router