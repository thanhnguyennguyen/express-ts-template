import express from 'express'
import exampleApi from '../routes/example.router'

const router = express.Router()
router.use('/example', exampleApi)
export default router
