import { Router } from 'express'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { create } from './create'
import { fetchByUser } from './fetch-by-user'

const billsRouter = Router()

billsRouter.use(verifyJWT)

billsRouter.get('/bills', fetchByUser)
billsRouter.post('/bills', create)

export { billsRouter }
