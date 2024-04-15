import { Router } from 'express'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { create } from './create'
import { fetch } from './fetch'

const billsRouter = Router()

billsRouter.use(verifyJWT)

billsRouter.get('/bills', fetch)
billsRouter.post('/bills', create)

export { billsRouter }
