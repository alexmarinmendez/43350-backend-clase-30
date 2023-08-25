import { Router } from 'express'
import { signup, getbill, sendSMS } from '../controllers/app.controller.js'

const router = Router()

router.post('/user/signup', signup)
router.post('/product/getbill', getbill)
router.post('/sms', sendSMS)

export default router