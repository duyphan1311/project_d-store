const express = require('express')
const router = express.Router()
const { categoryController } = require('../controllers')
const tokenHandler = require('../handlers/tokenHandler')
const cors = require('cors')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})

const upload = multer({ storage: storage })

router.post('/',
    //tokenHandler.verifyManagerToken,
    upload.single('image'),
    categoryController.create
)
router.put('/:id',
    tokenHandler.verifyManagerToken,
    upload.single('image'),
    categoryController.update
)
router.delete('/:id',
    tokenHandler.verifyManagerToken,
    categoryController.delete
)
router.get('/',
    categoryController.getAll
)
router.get('/:id',
    categoryController.getOne
)

router.get('/:categorySlug',
    categoryController.getAllProductsByCategory
)

module.exports = router