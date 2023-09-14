import express from 'express'
import { Login } from '../../services/login.js'
export const loginRouter = express.Router()

loginRouter.post('/',
  async (req, res) => {
    const { email, password } = req.body
    try {
      const user = await Login(email, password)
      res.json(user)
    } catch (error) {
      res.status(404).json({ error: error.message })
    }
  })
