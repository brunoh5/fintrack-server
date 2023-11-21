import { Router } from 'express'

import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { fetch } from './fetch'
import { get } from './get'

const categoriesRouter = Router()

categoriesRouter.use(verifyJWT)

categoriesRouter.get('/', fetch)
categoriesRouter.get('/:id', get)

export { categoriesRouter }
