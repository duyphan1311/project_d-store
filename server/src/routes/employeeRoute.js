const express = require('express');
const router = express.Router();
const { employeeController } = require('../controllers');
const tokenHandler = require('../handlers/tokenHandler');

router.post('/',
    tokenHandler.verifyAdminToken,
    employeeController.create
)

router.post(
    '/check-token',
    tokenHandler.verifyEmployeeToken,
    (req, res) => {
        res.status(200).json('Authorized');
    }
)
router.put('/:id',
    tokenHandler.verifyEmployeeToken,
    employeeController.update
)
router.delete('/:id',
    tokenHandler.verifyAdminToken,
    employeeController.delete
)
router.get('/',
    tokenHandler.verifyManagerToken,
    employeeController.getAll
)
router.get('/:id',
    tokenHandler.verifyToken,
    employeeController.getOne
)
router.get('/:employeeID/order',
    tokenHandler.verifyEmployeeToken,
    employeeController.getAllOrderByEmployee
)
router.get('/:employeeID/order/:orderID',
    tokenHandler.verifyEmployeeToken,
    employeeController.getOneOrderByEmployee
)
router.get('/:employeeID/receive-note',
    tokenHandler.verifyEmployeeToken,
    employeeController.getAllReciveNoteByEmployee
)
router.get('/:employeeID/receive-note/:receiveNoteID',
    tokenHandler.verifyEmployeeToken,
    employeeController.getOneReciveNoteByEmployee
)

//Manager routes
router.get('/summary',
    tokenHandler.verifyManagerToken,
    employeeController.summary
)

module.exports = router