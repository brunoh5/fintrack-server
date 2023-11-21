import { Router } from 'express'

import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { register } from './register'

const usersRouter = Router()

usersRouter.post('/users', register)
usersRouter.post('/sessions', authenticate)

usersRouter.get('/me', verifyJWT, profile)

export { usersRouter }
