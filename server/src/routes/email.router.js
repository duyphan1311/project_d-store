
var express = require('express');

var { emailController } = require('../controllers');

var router = express.Router()

router.post('/', emailController.sendmail)

module.exports = router