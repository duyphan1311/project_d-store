var express = require('express')
var router = express.Router()
const { historyController } = require('../controllers')

//Get Find Carts For User
router.get('/',
    historyController.index
)

// Get All History
router.get('/all',
    historyController.history
)

//Get Detail History
router.get('/:id',
    historyController.detail
)
router.put('/:id', historyController.update)

module.exports = router