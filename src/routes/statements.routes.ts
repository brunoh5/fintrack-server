import { Router } from 'express'

import { CreateStatementController } from '@/Controllers/Statements/CreateStatementController'
import { StatementsRepository } from '@/Repositories/StatementsRepository'
import { AccountsRepository } from '@/Repositories/AccountsRepository'
// import { ListAccountsController } from '@/Controllers/Accounts/ListAccountController'

const statementsRouter = Router()

const createStatementController = new CreateStatementController(
	new StatementsRepository(),
	new AccountsRepository(),
)
// const listAccountController = new ListAccountsController()

// accountsRouter.get('/', listAccountController.handle)
statementsRouter.post('/', createStatementController.handle)

export { statementsRouter }
