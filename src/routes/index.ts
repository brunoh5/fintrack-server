import { Router } from 'express'
import { accountsRouter } from './accounts.routes'
import { statementsRouter } from './statements.routes'

import { CreateUserController } from '../Controllers/CreateUserController'
import { ListUsersController } from '../Controllers/ListUsersController'
import { UsersRepository } from '@/Repositories/UsersRepository'

const router = Router()

const createUserController = new CreateUserController(new UsersRepository())
const listUsersController = new ListUsersController()

router.get('/users', listUsersController.handle)
router.post('/users', createUserController.handle)

router.use('/accounts', accountsRouter)
router.use('/statements', statementsRouter)

export { router }
