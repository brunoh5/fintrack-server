import { Router } from 'express'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { create } from './create'
import { fetch } from './fetch'
import { pay } from './pay'

const billsRouter = Router()

billsRouter.use(verifyJWT)

billsRouter.get('/bills', fetch)
billsRouter.post('/bills', create)
billsRouter.post('/bills/:billsId/pay', pay)

export { billsRouter }
