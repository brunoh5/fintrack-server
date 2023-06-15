import { Router } from 'express'

import { CreateAccountController } from '../Controllers/Accounts/CreateAccountController'

const accountsRouter = Router()

const createAccountController = new CreateAccountController()

accountsRouter.post('/create', createAccountController.handle)

export { accountsRouter }
