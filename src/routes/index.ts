import { Router } from 'express'
import { accountsRouter } from './accounts.routes'

import { CreateUserController } from '../Controllers/CreateUserController'
import { ListUsersController } from '../Controllers/ListUsersController'

const router = Router()

const createUserController = new CreateUserController()
const listUsersController = new ListUsersController()

router.get('/users', listUsersController.handle)
router.post('/users', createUserController.handle)

router.use('/accounts', accountsRouter)

export { router }
