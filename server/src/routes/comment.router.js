var express = require('express');

var { commentController } = require('../controllers')

var router = express.Router()

router.get('/',
    commentController.index
)

router.post('/send',
    commentController.send
)

module.exports = router