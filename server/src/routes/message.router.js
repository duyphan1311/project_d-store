var express = require('express')
var router = express.Router()
var { messageController } = require('../controllers')

router.get('/',
    messageController.index
)

router.post('/send',
    messageController.send
)

router.post('/conversation',
    messageController.conversation
)

module.exports = router