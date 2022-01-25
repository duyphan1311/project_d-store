const express = require('express')
const router = express.Router()
const { receiveNoteController } = require('../controllers')
const tokenHandler = require('../handlers/tokenHandler')

router.post('/',
    tokenHandler.verifyManegerToken,
    receiveNoteController.create
)
router.put('/:id',
    tokenHandler.verifyManegerToken,
    receiveNoteController.update
)
router.delete('/:id',
    tokenHandler.verifyManegerToken,
    receiveNoteController.delete
)
router.get('/',
    tokenHandler.verifyManegerToken,
    receiveNoteController.getAll
)
router.get('/:id',
    tokenHandler.verifyManegerToken,
    receiveNoteController.getOne
)

module.exports = router