import { Router } from 'express'

import { CreateAccountController } from '../Controllers/Accounts/CreateAccountController'
import { ListAccountsController } from '@/Controllers/Accounts/ListAccountController'
import { AccountsRepository } from '@/Repositories/AccountsRepository'

const accountsRouter = Router()

const createAccountController = new CreateAccountController(
	new AccountsRepository(),
)
const listAccountController = new ListAccountsController(
	new AccountsRepository(),
)

accountsRouter.get('/', listAccountController.handle)
accountsRouter.post('/', createAccountController.handle)

export { accountsRouter }
