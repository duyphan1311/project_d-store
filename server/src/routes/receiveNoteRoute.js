const express = require('express')
const router = express.Router()
const { receiveNoteController } = require('../controllers')
const tokenHandler = require('../handlers/tokenHandler')

router.post('/',
    tokenHandler.verifyManagerToken,
    receiveNoteController.create
)
router.put('/:id',
    tokenHandler.verifyManagerToken,
    receiveNoteController.update
)
router.delete('/:id',
    tokenHandler.verifyManagerToken,
    receiveNoteController.delete
)
router.get('/',
    tokenHandler.verifyManagerToken,
    receiveNoteController.getAll
)
router.get('/:id',
    tokenHandler.verifyManagerToken,
    receiveNoteController.getOne
)

module.exports = router