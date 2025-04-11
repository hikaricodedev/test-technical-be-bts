const express = require('express')
const router = express.Router()
const {findAllChecklist , createChecklist , getChecklistItemByChecklistId , createChecklistItem , updateStatusChecklistItem , deleteChecklistItem , updateStatusChecklistItemName} = require('../controllers/ChecklistController')

router.get('/checklist', findAllChecklist)
router.post('/checklist' , createChecklist)
router.get('/checklist/:checklistid/item', getChecklistItemByChecklistId)
router.post('/checklist/:checklistid/item', createChecklistItem)
router.put('/checklist/:checklistid/item/:checklistitemid' , updateStatusChecklistItem)
router.delete('/checklist/:checklistid/item/:checklistitemid' , deleteChecklistItem)
router.put('/checklist/:checklistid/item/rename/:checklistitemid' , updateStatusChecklistItemName)

// router.post('/register', UserController.registerUser)
// router.post('/login', UserController.loginUser)

module.exports = router