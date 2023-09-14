import express from 'express'
import { createUser } from '../../mutation/createUser.js'
export const signupRouter = express.Router()

signupRouter.post('/',
  async (req, res) => {
    try {
      const newUser = await createUser(req.body)
      res.json(newUser)
    } catch (error) {
      res.status(404).json({ error: error.message })
    }
  })
