import { Router } from 'express'

import { UserController } from '@/Controllers/UserController'
import { AuthenticateUserController } from '@/Controllers/AuthenticateUserController'

const usersRouter = Router()

const userController = new UserController()
const authenticateUserController = new AuthenticateUserController()

usersRouter.post('/create', userController.create)
usersRouter.post('/session', authenticateUserController.handle)

export { usersRouter }
