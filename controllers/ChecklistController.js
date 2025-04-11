const {checklist , checklist_item} = require('../models')


const findAllChecklist = async (req ,res) => {
    try {
        const data = await checklist.findAll({
            include : [
                {
                    model : checklist_item,
                    as : 'checklist_item'
                }
            ]        
        })
        res.status(200).json(data)
    } catch (error){
        console.log('Error:' + error)
        res.status(500).json({"message" : "Something Wrong"})
    }
}

const createChecklist = async (req ,res) => {
    try {
        const { name , item} = req.body
        const newChecklist  = await checklist.create({
            checklist_name : name
        })
        if (newChecklist){
            if (item){
                if (item.length > 0){
                    for (const ci of item){
                        const newChecklistItem = await checklist_item.create({
                            checklistid : newChecklist.id,
                            itemName : ci.itemName
                        })
                    }
                }
            }
            res.status(201).json({message : 'Create data success!' , data : newChecklist})
        } else {
            res.status(500).json({message : 'Something Wrong'})
        }
    } catch (error) {
        console.log('Error:'+error)
        res.status(500).json({message : 'Error Server'})
    }
}

const getChecklistItemByChecklistId = async (req ,res) => {
    try {
        const {checklistid} = req.params

        const checklist_item_data = await checklist_item.findAll({
            where : {
                checklistid : checklistid
            }
        })

        if (checklist_item_data){
            res.status(200).json(checklist_item_data)
        } else {
            res.status(404).json({message : 'Data not found!'})
        }
    } catch (error){
        console.log('Error:'+ error )
        res.status(500).json({message : "Error Server"})
    }
}

const createChecklistItem = async (req, res) => {
    try {
        const {checklistid} = req.params
        const {itemName} = req.body

        const newChecklistItem = await checklist_item.create({
            checklistid : checklistid,
            itemName : itemName
        })
        if (newChecklistItem){
            res.status(201).json(newChecklistItem)
        } else {
            res.status(500).json({message : 'Something Wrong'})
        }

    } catch (error){
        console.log('Error:' +error)
        res.status(500).json({message : 'Error Server'})
    }
}

const updateStatusChecklistItem = async (req,res) => {
    try {
        const {checklistid,checklistitemid} = req.params

        const checklistItem = await checklist_item.findOne({
            where : {
                id : checklistitemid,
                checklistid : checklistid
            }
        })
        if (checklistItem) {
            const currentStatus = checklistItem.itemStatus
            checklistItem.itemStatus = currentStatus == 1 ? 2 : 1
            await checklistItem.save()

            res.status(201).json(checklistItem)
        } else {
            res.status(404).json({message : 'Data not found'})
        }
    } catch (error){
        console.log('Error:'+error)
        res.status(500).json({message : 'Error Server'})
    }
}

const deleteChecklistItem = async (req,res) => {
    try {
        const {checklistid,checklistitemid} = req.params

        const checklistItem = await checklist_item.findOne({
            where : {
                id : checklistitemid,
                checklistid : checklistid
            }
        })
        if (checklistItem) {
            await checklistItem.destroy()

            res.status(200).json({message : 'Delete checklist item success!'})
        } else {
            res.status(404).json({message : 'Data not found'})
        }
    } catch (error){
        console.log('Error:'+error)
        res.status(500).json({message : 'Error Server'})
    }
}

const updateStatusChecklistItemName = async (req,res) => {
    try {
        const {checklistid,checklistitemid} = req.params
        const { itemName } = req.body

        const checklistItem = await checklist_item.findOne({
            where : {
                id : checklistitemid,
                checklistid : checklistid
            }
        })
        if (checklistItem) {
            const currentStatus = checklistItem.itemStatus
            checklistItem.itemName = itemName
            await checklistItem.save()

            res.status(201).json(checklistItem)
        } else {
            res.status(404).json({message : 'Data not found'})
        }
    } catch (error){
        console.log('Error:'+error)
        res.status(500).json({message : 'Error Server'})
    }
}

module.exports = {findAllChecklist , createChecklist , getChecklistItemByChecklistId , createChecklistItem , updateStatusChecklistItem,deleteChecklistItem , updateStatusChecklistItemName}