const express = require('express')
const router = express.Router()
const tokenHandler = require('../handlers/tokenHandler')
const { commentController } = require('../controllers')

router.post('/',
    tokenHandler.verifyToken,
    commentController.create
)

router.get('/:id',
    tokenHandler.verifyToken,
    commentController.getComment
)

router.put('/:id',
    tokenHandler.verifyToken,
    commentController.update
)

router.delete('/:id',
    tokenHandler.verifyToken,
    commentController.delete
)

module.exports = router