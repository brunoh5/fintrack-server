import { Router } from 'express'

import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { create } from './create'
import { fetchByUser } from './fetchByUser'

const billsRouter = Router()

billsRouter.use(verifyJWT)

billsRouter.get('/accounts', fetchByUser)
billsRouter.post('/bills', create)

export { billsRouter }
