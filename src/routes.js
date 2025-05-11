import express from 'express'
import { createOrUpdate, deleteUserById, getUserById, readAllUsers } from './db/db.js'

const router = express.Router()

router.get('/', async(req, res) => {
    const { success, data } = await readAllUsers()

    if(success){
        return res.json({success, data})
    }
    return res.status(500).json({success:false, messsage: "Error"})
})

router.get('/:id', async(req, res) => {
    const { id } = req.params
    const { success, data } = await getUserById(id)
    if(success){
        return res.json({success, data})
    }

    return res.status(500).json({success: false, message: "Error"})
})


router.post('/', async(req, res) => {
    const { success, data } = await createOrUpdate(req.body)

    if(success){
        return res.json({success, data})
    }

    return res.status(500).json({success: false, message: 'Error'})
})


router.put('/:id', async(req, res) => {
    const user = req.body
    const { id } = req.params
    user.id = parseInt(id)

    const { success, data } = await createOrUpdate(user)

    if(success){
        return res.json({success, data})
    }

    return res.status(500).json({success: false, message: "Error"})
})


router.delete('/:id', async (req, res) => {
    const { id } = req.params
    const { success, data } = await deleteUserById(id)
    if (success) {
      return res.json({ success, data })
    }
    return res.status(500).json({ success: false, message: 'Error'})
})

export default router