const multer = require('multer')


exports.upload = async path => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path)
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        },
    })
    return multer({ storage: storage })
}