import { Router } from 'express'
import { signup, getbill } from '../controllers/app.controller.js'

const router = Router()

router.post('/user/signup', signup)
router.post('/product/getbill', getbill)

export default router