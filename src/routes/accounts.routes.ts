import { Router } from 'express'

import { UserController } from '@/Controllers/UserController'
import { AuthenticateUserController } from '@/Controllers/AuthenticateUserController'

const accountsRouter = Router()

const userController = new UserController()
const authenticateUserController = new AuthenticateUserController()

accountsRouter.post('/', userController.create)
accountsRouter.post('/sessions', authenticateUserController.handle)

export { accountsRouter }
