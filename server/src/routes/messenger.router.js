var express = require('express')
var router = express.Router()
var { messengerController } = require('../controllers')

router.get('/',
    messengerController.index
)

router.post('/send',
    messengerController.send
)

router.post('/conversation',
    messengerController.conversation
)

module.exports = router