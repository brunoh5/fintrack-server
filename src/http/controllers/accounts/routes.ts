import { Router } from 'express'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { create } from './create'
import { deleteAccount } from './delete'
import { fetch } from './fetch'
import { get } from './get'
import { update } from './update'

const accountsRouter = Router()

accountsRouter.use(verifyJWT)

accountsRouter.post('/accounts', create)
accountsRouter.get('/accounts', fetch)
accountsRouter.get('/accounts/:id', get)
accountsRouter.delete('/accounts/:id', deleteAccount)
accountsRouter.put('/accounts/:id', update)

export { accountsRouter }
