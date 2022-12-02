var express = require('express')
var router = express.Router()
const { cartController } = require('../controllers')

//Get Find Carts For User
router.get('/',
    cartController.index
)

router.post('/add',
    cartController.addToCart
)

router.delete('/delete',
    cartController.deleteToCart
)

router.put('/update',
    cartController.updateToCart
)

module.exports = router